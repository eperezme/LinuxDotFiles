(()=>{"use strict";var e,t={1051:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function u(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,u)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=r(1181),s=r(7542),i=r(3394),u=r(2697),a=r(3098),c=r(7957);window.SB=s.default;const d=new(r(3147).default)({registerFirefoxContentScript:p,unregisterFirefoxContentScript:h}),l={},f={};function p(e){const t=f[e.id];t&&t.unregister(),(0,i.default)({allFrames:e.allFrames,js:e.js,css:e.css,matches:e.matches}).then((t=>{f[e.id]=t}))}function h(e){f[e]&&(f[e].unregister(),delete f[e])}d.wait((()=>null!==s.default.config)).then((function(){s.default.config.supportInvidious&&d.setupExtraSiteContentScripts()})),(0,u.setupBackgroundRequestProxy)(),(0,a.setupTabUpdates)(s.default),chrome.runtime.onMessage.addListener((function(e,t,r){var i;switch(e.message){case"openConfig":return chrome.tabs.create({url:chrome.runtime.getURL("options/options.html"+(e.hash?"#"+e.hash:""))}),!1;case"openHelp":return chrome.tabs.create({url:chrome.runtime.getURL("help/index.html")}),!1;case"openUpsell":return chrome.tabs.create({url:chrome.runtime.getURL("upsell/index.html")}),!1;case"openPage":return chrome.tabs.create({url:chrome.runtime.getURL(e.url)}),!1;case"submitVote":return function(e,t,r){return n(this,void 0,void 0,(function*(){let i=s.default.config.userID;null!=i&&"undefined"!==i||(i=(0,c.generateUserID)(),s.default.config.userID=i);const a=void 0!==e?"&type="+e:"&category="+r,d=yield function(e,t,r={}){return n(this,void 0,void 0,(function*(){const n=s.default.config.testingServer?o.testingServerAddress:s.default.config.serverAddress;return yield(0,u.sendRealRequestToCustomServer)(e,n+t,r)}))}("POST","/api/voteOnSponsorTime?UUID="+t+"&userID="+i+a);return d.ok?{successType:1,responseText:yield d.text()}:405==d.status?{successType:0,statusCode:d.status,responseText:yield d.text()}:{successType:-1,statusCode:d.status,responseText:yield d.text()}}))}(e.type,e.UUID,e.category).then(r),!0;case"registerContentScript":return p(e),!1;case"unregisterContentScript":return h(e.id),!1;case"tabs":return chrome.tabs.query({active:!0,currentWindow:!0},(t=>{chrome.tabs.sendMessage(t[0].id,e.data,(e=>{r(e)}))})),!0;case"time":case"infoUpdated":case"videoChanged":return t.tab&&(null===(i=l[t.tab.id])||void 0===i||i.postMessage(e)),!1;default:return!1}})),chrome.runtime.onConnect.addListener((e=>{"popup"===e.name&&chrome.tabs.query({active:!0,currentWindow:!0},(t=>{l[t[0].id]=e}))})),chrome.runtime.onInstalled.addListener((function(){setTimeout((()=>n(this,void 0,void 0,(function*(){if(!s.default.config.userID){chrome.tabs.create({url:chrome.extension.getURL("/help/index.html")});const e=(0,c.generateUserID)();s.default.config.userID=e,s.default.config.categoryPillUpdate=!0}s.default.config.supportInvidious&&((yield d.containsInvidiousPermission())||chrome.tabs.create({url:chrome.extension.getURL("/permissions/index.html")}))}))),1500)}))}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,r,o,s)=>{if(!r){var i=1/0;for(d=0;d<e.length;d++){for(var[r,o,s]=e[d],u=!0,a=0;a<r.length;a++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](r[a])))?r.splice(a--,1):(u=!1,s<i&&(i=s));if(u){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,o,s]},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={352:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,s,[i,u,a]=r,c=0;if(i.some((t=>0!==e[t]))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(a)var d=a(n)}for(t&&t(r);c<i.length;c++)s=i[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},r=self.webpackChunksponsorblock=self.webpackChunksponsorblock||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[736],(()=>n(1051)));o=n.O(o)})();