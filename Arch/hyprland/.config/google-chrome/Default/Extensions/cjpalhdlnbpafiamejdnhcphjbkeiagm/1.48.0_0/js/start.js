/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2014-present Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

/* globals browser */

'use strict';

/******************************************************************************/

import './vapi-common.js';
import './vapi-background.js';
import './vapi-background-ext.js';

/******************************************************************************/

// The following modules are loaded here until their content is better organized
import './commands.js';
import './messaging.js';
import './storage.js';
import './tab.js';
import './ublock.js';
import './utils.js';

import cacheStorage from './cachestorage.js';
import contextMenu from './contextmenu.js';
import io from './assets.js';
import lz4Codec from './lz4.js';
import staticExtFilteringEngine from './static-ext-filtering.js';
import staticFilteringReverseLookup from './reverselookup.js';
import staticNetFilteringEngine from './static-net-filtering.js';
import µb from './background.js';
import webRequest from './traffic.js';
import { redirectEngine } from './redirect-engine.js';
import { ubolog } from './console.js';

import {
    permanentFirewall,
    sessionFirewall,
    permanentSwitches,
    sessionSwitches,
    permanentURLFiltering,
    sessionURLFiltering,
} from './filtering-engines.js';

/******************************************************************************/

// Load all: executed once.

(async ( ) => {
// >>>>> start of private scope

/******************************************************************************/

vAPI.app.onShutdown = ( ) => {
    staticFilteringReverseLookup.shutdown();
    io.updateStop();
    staticNetFilteringEngine.reset();
    staticExtFilteringEngine.reset();
    sessionFirewall.reset();
    permanentFirewall.reset();
    sessionURLFiltering.reset();
    permanentURLFiltering.reset();
    sessionSwitches.reset();
    permanentSwitches.reset();
};

/******************************************************************************/

// This is called only once, when everything has been loaded in memory after
// the extension was launched. It can be used to inject content scripts
// in already opened web pages, to remove whatever nuisance could make it to
// the web pages before uBlock was ready.
//
// https://bugzilla.mozilla.org/show_bug.cgi?id=1652925#c19
//   Mind discarded tabs.

const initializeTabs = async ( ) => {
    const manifest = browser.runtime.getManifest();
    if ( manifest instanceof Object === false ) { return; }

    const toCheck = [];
    const tabIds = [];
    {
        const checker = { file: 'js/scriptlets/should-inject-contentscript.js' };
        const tabs = await vAPI.tabs.query({ url: '<all_urls>' });
        for ( const tab of tabs  ) {
            if ( tab.discarded === true ) { continue; }
            const { id, url } = tab;
            µb.tabContextManager.commit(id, url);
            µb.bindTabToPageStore(id, 'tabCommitted', tab);
            // https://github.com/chrisaljoudi/uBlock/issues/129
            //   Find out whether content scripts need to be injected
            //   programmatically. This may be necessary for web pages which
            //   were loaded before uBO launched.
            toCheck.push(
                /^https?:\/\//.test(url)
                    ? vAPI.tabs.executeScript(id, checker) 
                    : false
            );
            tabIds.push(id);
        }
    }
    const results = await Promise.all(toCheck);
    for ( let i = 0; i < results.length; i++ ) {
        const result = results[i];
        if ( result.length === 0 || result[0] !== true ) { continue; }
        // Inject declarative content scripts programmatically.
        for ( const contentScript of manifest.content_scripts ) {
            for ( const file of contentScript.js ) {
                vAPI.tabs.executeScript(tabIds[i], {
                    file: file,
                    allFrames: contentScript.all_frames,
                    runAt: contentScript.run_at
                });
            }
        }
    }
};

/******************************************************************************/

// To bring older versions up to date
//
// https://www.reddit.com/r/uBlockOrigin/comments/s7c9go/
//   Abort suspending network requests when uBO is merely being installed.

const onVersionReady = lastVersion => {
    if ( lastVersion === vAPI.app.version ) { return; }

    vAPI.storage.set({ version: vAPI.app.version });

    const lastVersionInt = vAPI.app.intFromVersion(lastVersion);

    // Special case: first installation
    if ( lastVersionInt === 0 ) {
        vAPI.net.unsuspend({ all: true, discard: true });
        return;
    }

    // Since built-in resources may have changed since last version, we
    // force a reload of all resources.
    redirectEngine.invalidateResourcesSelfie(io);

    // https://github.com/LiCybora/NanoDefenderFirefox/issues/196
    //   Toggle on the blocking of CSP reports by default for Firefox.
    if (
        lastVersionInt <= 1031003011 &&
        vAPI.webextFlavor.soup.has('firefox')
    ) {
        sessionSwitches.toggle('no-csp-reports', '*', 1);
        permanentSwitches.toggle('no-csp-reports', '*', 1);
        µb.saveHostnameSwitches();
    }
};

/******************************************************************************/

// https://github.com/chrisaljoudi/uBlock/issues/226
// Whitelist in memory.
// Whitelist parser needs PSL to be ready.
// gorhill 2014-12-15: not anymore
//
// https://github.com/uBlockOrigin/uBlock-issues/issues/1433
//   Allow admins to add their own trusted-site directives.

const onNetWhitelistReady = (netWhitelistRaw, adminExtra) => {
    if ( typeof netWhitelistRaw === 'string' ) {
        netWhitelistRaw = netWhitelistRaw.split('\n');
    }
    // Append admin-controlled trusted-site directives
    if (
        adminExtra instanceof Object &&
        Array.isArray(adminExtra.trustedSiteDirectives)
    ) {
        for ( const directive of adminExtra.trustedSiteDirectives ) {
            µb.netWhitelistDefault.push(directive);
            netWhitelistRaw.push(directive);
        }
    }
    µb.netWhitelist = µb.whitelistFromArray(netWhitelistRaw);
    µb.netWhitelistModifyTime = Date.now();
};

/******************************************************************************/

// User settings are in memory

const onUserSettingsReady = fetched => {
    // Terminate suspended state?
    const tnow = Date.now() - vAPI.T0;
    if (
        vAPI.Net.canSuspend() &&
        fetched.suspendUntilListsAreLoaded === false
    ) {
        vAPI.net.unsuspend({ all: true, discard: true });
        ubolog(`Unsuspend network activity listener at ${tnow} ms`);
        µb.supportStats.unsuspendAfter = `${tnow} ms`;
    } else if (
        vAPI.Net.canSuspend() === false &&
        fetched.suspendUntilListsAreLoaded
    ) {
        vAPI.net.suspend();
        ubolog(`Suspend network activity listener at ${tnow} ms`);
    }

    // `externalLists` will be deprecated in some future, it is kept around
    // for forward compatibility purpose, and should reflect the content of
    // `importedLists`.
    if ( Array.isArray(fetched.externalLists) ) {
        fetched.externalLists = fetched.externalLists.join('\n');
        vAPI.storage.set({ externalLists: fetched.externalLists });
    }
    if (
        fetched.importedLists.length === 0 &&
        fetched.externalLists !== ''
    ) {
        fetched.importedLists =
            fetched.externalLists.trim().split(/[\n\r]+/);
    }

    fromFetch(µb.userSettings, fetched);

    if ( µb.privacySettingsSupported ) {
        vAPI.browserSettings.set({
            'hyperlinkAuditing': !µb.userSettings.hyperlinkAuditingDisabled,
            'prefetching': !µb.userSettings.prefetchingDisabled,
            'webrtcIPAddress': !µb.userSettings.webrtcIPAddressHidden
        });
    }

    // https://github.com/uBlockOrigin/uBlock-issues/issues/1513
    if (
        vAPI.net.canUncloakCnames &&
        µb.userSettings.cnameUncloakEnabled === false
    ) {
        vAPI.net.setOptions({ cnameUncloakEnabled: false });
    }
};

/******************************************************************************/

// https://bugzilla.mozilla.org/show_bug.cgi?id=1588916
//   Save magic format numbers into the cache storage itself.
// https://github.com/uBlockOrigin/uBlock-issues/issues/1365
//   Wait for removal of invalid cached data to be completed.

const onCacheSettingsReady = async fetched => {
    if ( fetched.compiledMagic !== µb.systemSettings.compiledMagic ) {
        µb.compiledFormatChanged = true;
        µb.selfieIsInvalid = true;
        ubolog(`Serialized format of static filter lists changed`);
    }
    if ( fetched.selfieMagic !== µb.systemSettings.selfieMagic ) {
        µb.selfieIsInvalid = true;
        ubolog(`Serialized format of selfie changed`);
    }
    if ( µb.selfieIsInvalid ) {
        µb.selfieManager.destroy();
        cacheStorage.set(µb.systemSettings);
    }
};

/******************************************************************************/

const onHiddenSettingsReady = async ( ) => {
    // Maybe customize webext flavor
    if ( µb.hiddenSettings.modifyWebextFlavor !== 'unset' ) {
        const tokens = µb.hiddenSettings.modifyWebextFlavor.split(/\s+/);
        for ( const token of tokens ) {
            switch ( token[0] ) {
            case '+':
                vAPI.webextFlavor.soup.add(token.slice(1));
                break;
            case '-':
                vAPI.webextFlavor.soup.delete(token.slice(1));
                break;
            default:
                vAPI.webextFlavor.soup.add(token);
                break;
            }
        }
        ubolog(`Override default webext flavor with ${tokens}`);
    }

    // Maybe disable WebAssembly
    if ( vAPI.canWASM && µb.hiddenSettings.disableWebAssembly !== true ) {
        const wasmModuleFetcher = function(path) {
            return fetch(`${path}.wasm`, { mode: 'same-origin' }).then(
                WebAssembly.compileStreaming
            ).catch(reason => {
                ubolog(reason);
            });
        };
        staticNetFilteringEngine.enableWASM(wasmModuleFetcher, './js/wasm/').then(result => {
            if ( result !== true ) { return; }
            ubolog(`WASM modules ready ${Date.now()-vAPI.T0} ms after launch`);
        });
    }

    // Maybe override default cache storage
    const cacheBackend = await cacheStorage.select(
        µb.hiddenSettings.cacheStorageAPI
    );
    ubolog(`Backend storage for cache will be ${cacheBackend}`);
};

/******************************************************************************/

const onFirstFetchReady = (fetched, adminExtra) => {
    // https://github.com/uBlockOrigin/uBlock-issues/issues/507
    //   Firefox-specific: somehow `fetched` is undefined under certain
    //   circumstances even though we asked to load with default values.
    if ( fetched instanceof Object === false ) {
        fetched = createDefaultProps();
    }

    // Order is important -- do not change:
    fromFetch(µb.localSettings, fetched);
    fromFetch(µb.restoreBackupSettings, fetched);

    permanentFirewall.fromString(fetched.dynamicFilteringString);
    sessionFirewall.assign(permanentFirewall);
    permanentURLFiltering.fromString(fetched.urlFilteringString);
    sessionURLFiltering.assign(permanentURLFiltering);
    permanentSwitches.fromString(fetched.hostnameSwitchesString);
    sessionSwitches.assign(permanentSwitches);

    onNetWhitelistReady(fetched.netWhitelist, adminExtra);
    onVersionReady(fetched.version);
};

/******************************************************************************/

const toFetch = (from, fetched) => {
    for ( const k in from ) {
        if ( from.hasOwnProperty(k) === false ) { continue; }
        fetched[k] = from[k];
    }
};

const fromFetch = (to, fetched) => {
    for ( const k in to ) {
        if ( to.hasOwnProperty(k) === false ) { continue; }
        if ( fetched.hasOwnProperty(k) === false ) { continue; }
        to[k] = fetched[k];
    }
};

const createDefaultProps = ( ) => {
    const fetchableProps = {
        'dynamicFilteringString': µb.dynamicFilteringDefault.join('\n'),
        'urlFilteringString': '',
        'hostnameSwitchesString': µb.hostnameSwitchesDefault.join('\n'),
        'lastRestoreFile': '',
        'lastRestoreTime': 0,
        'lastBackupFile': '',
        'lastBackupTime': 0,
        'netWhitelist': µb.netWhitelistDefault,
        'version': '0.0.0.0'
    };
    toFetch(µb.localSettings, fetchableProps);
    toFetch(µb.restoreBackupSettings, fetchableProps);
    return fetchableProps;
};

/******************************************************************************/

try {
    ubolog(`Start sequence of loading storage-based data ${Date.now()-vAPI.T0} ms after launch`);

    // https://github.com/gorhill/uBlock/issues/531
    await µb.restoreAdminSettings();
    ubolog(`Admin settings ready ${Date.now()-vAPI.T0} ms after launch`);

    await µb.loadHiddenSettings();
    await onHiddenSettingsReady();
    ubolog(`Hidden settings ready ${Date.now()-vAPI.T0} ms after launch`);

    const adminExtra = await vAPI.adminStorage.get('toAdd');
    ubolog(`Extra admin settings ready ${Date.now()-vAPI.T0} ms after launch`);

    // https://github.com/uBlockOrigin/uBlock-issues/issues/1365
    //   Wait for onCacheSettingsReady() to be fully ready.
    const [ , , lastVersion ] = await Promise.all([
        µb.loadSelectedFilterLists().then(( ) => {
            ubolog(`List selection ready ${Date.now()-vAPI.T0} ms after launch`);
        }),
        cacheStorage.get(
            { compiledMagic: 0, selfieMagic: 0 }
        ).then(fetched => {
            ubolog(`Cache magic numbers ready ${Date.now()-vAPI.T0} ms after launch`);
            onCacheSettingsReady(fetched);
        }),
        vAPI.storage.get(createDefaultProps()).then(fetched => {
            ubolog(`First fetch ready ${Date.now()-vAPI.T0} ms after launch`);
            onFirstFetchReady(fetched, adminExtra);
            return fetched.version;
        }),
        µb.loadUserSettings().then(fetched => {
            ubolog(`User settings ready ${Date.now()-vAPI.T0} ms after launch`);
            onUserSettingsReady(fetched);
        }),
        µb.loadPublicSuffixList().then(( ) => {
            ubolog(`PSL ready ${Date.now()-vAPI.T0} ms after launch`);
        }),
    ]);

    // https://github.com/uBlockOrigin/uBlock-issues/issues/1547
    if ( lastVersion === '0.0.0.0' && vAPI.webextFlavor.soup.has('chromium') ) {
        vAPI.app.restart();
        return;
    }
} catch (ex) {
    console.trace(ex);
}

// Prime the filtering engines before first use.
staticNetFilteringEngine.prime();

// https://github.com/uBlockOrigin/uBlock-issues/issues/817#issuecomment-565730122
//   Still try to load filter lists regardless of whether a serious error
//   occurred in the previous initialization steps.
let selfieIsValid = false;
try {
    selfieIsValid = await µb.selfieManager.load();
    if ( selfieIsValid === true ) {
        ubolog(`Selfie ready ${Date.now()-vAPI.T0} ms after launch`);
    }
} catch (ex) {
    console.trace(ex);
}
if ( selfieIsValid !== true ) {
    try {
        await µb.loadFilterLists();
        ubolog(`Filter lists ready ${Date.now()-vAPI.T0} ms after launch`);
    } catch (ex) {
        console.trace(ex);
    }
}

// Final initialization steps after all needed assets are in memory.

// https://github.com/uBlockOrigin/uBlock-issues/issues/974
//   This can be used to defer filtering decision-making.
µb.readyToFilter = true;

// Start network observers.
webRequest.start();

// Ensure that the resources allocated for decompression purpose (likely
// large buffers) are garbage-collectable immediately after launch.
// Otherwise I have observed that it may take quite a while before the
// garbage collection of these resources kicks in. Relinquishing as soon
// as possible ensure minimal memory usage baseline.
lz4Codec.relinquish();

// Initialize internal state with maybe already existing tabs.
initializeTabs();

// https://github.com/chrisaljoudi/uBlock/issues/184
//   Check for updates not too far in the future.
io.addObserver(µb.assetObserver.bind(µb));
µb.scheduleAssetUpdater(
    µb.userSettings.autoUpdate
        ? µb.hiddenSettings.autoUpdateDelayAfterLaunch * 1000
        : 0
);

// Force an update of the context menu according to the currently
// active tab.
contextMenu.update();

// https://github.com/uBlockOrigin/uBlock-issues/issues/717
//   Prevent the extension from being restarted mid-session.
browser.runtime.onUpdateAvailable.addListener(details => {
    const toInt = vAPI.app.intFromVersion;
    if (
        µb.hiddenSettings.extensionUpdateForceReload === true ||
        toInt(details.version) <= toInt(vAPI.app.version)
    ) {
        vAPI.app.restart();
    }
});

µb.supportStats.allReadyAfter = `${Date.now() - vAPI.T0} ms`;
if ( selfieIsValid ) {
    µb.supportStats.allReadyAfter += ' (selfie)';
}
ubolog(`All ready ${µb.supportStats.allReadyAfter} after launch`);

// <<<<< end of private scope
})();
