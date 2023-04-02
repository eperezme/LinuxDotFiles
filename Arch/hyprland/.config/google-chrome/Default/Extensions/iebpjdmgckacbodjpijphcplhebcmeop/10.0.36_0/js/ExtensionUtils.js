
function getCurrentExtensionPageUrl() {
  try {
    if (typeof getPageUrlForActiveTab === 'function') {
      return getPageUrlForActiveTab();
    }
    if (typeof chrome.extension.getBackgroundPage === 'function') {
      return chrome.extension.getBackgroundPage().getPageUrlForActiveTab();
    }
    if (window.location && window.location.href) {
      return window.location.href;
    }
  } catch (e) {}
  return null;
}

function getExtensionUserConfig() {
  const browserEnv = new BrowserEnv();
  return browserEnv
      .getWorlds(['_recipe_world'], _TCAP_CONFIG_DEFAULTS)
      .then(values => {
        const config = {};
        _TCAP_CONFIG_KEYS.forEach(key => {
          config[key] = values[key];
        });

        if (_TCAP_CONFIG.devPretendPro) {
          config.paidPro = 1;
        }

        if (_TCAP_CONFIG.devPretendCloud) {
          config.paidCloud = 1;
        }

        const pageUrl = getCurrentExtensionPageUrl();
        if (pageUrl && pageUrl.startsWith("chrome-extension") && pageUrl.includes("onboard/onboard.html")) {
          config.paidPro = 1;
        }

        // NOTE(gmike, 4/2/2021): Backwards compat for typo.
        if (config.bindToClipbard === true) {
          config.bindToClipboard = true;
        }

        return config;
      });
}

function _tcFormatNowDateKey(dateString) {
  if (!dateString) {
    return 'N/A';
  }
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${month}/${day}/${year}`;
}

function _tcGetNowDateKey() {
  const date = new Date();

  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return `${year}${month}${day}`;
}
