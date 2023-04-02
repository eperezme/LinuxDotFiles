
function handleError(err) {
  console.log(err);
  const message = (err && err.message) ? err.message : 'Unknown error caught';
  
  const alert = document.createElement('div');
  alert.innerHTML = `<span class="tc-alert-message">${message}</span>`;
  alert.className = 'alert alert-warning';
  alert.addEventListener('click', alert.remove.bind(alert));

  const errorWrapper = document.querySelector('.global-errors');
  errorWrapper.appendChild(alert);
}

function setOptionsPageTitle(messageId) {
  document.title = chrome.i18n.getMessage(messageId);
}

function updateProFlowVisibilities(userConfig, upgradeManager) {
  Array
      .from(document.querySelectorAll('.upgrade-hidden'))
      .forEach(el => el.classList.remove('hidden'));

   upgradeManager
      .checkLicense(true)
      .then(isPro => {
        if (isPro) {
          Array
              .from(document.querySelectorAll('.no-pro'))
              .forEach(el => el.classList.add('hidden'));
          Array
              .from(document.querySelectorAll('.only-pro'))
              .forEach(el => el.classList.remove('hidden'));

          Array
              .from(document.querySelectorAll('.onboard-on-options-page-next-steps-wrapper'))
              .forEach(el => el.classList.add('hidden'));
        } else {
          if (_TCAP_CONFIG.paidOnly && userConfig.requiresPaid) {
            Array
                .from(document.querySelectorAll('.no-pro-activate'))
                .forEach(el => el.classList.remove('hidden'));
          } else {
            Array
                .from(document.querySelectorAll('.no-pro-upgrade'))
                .forEach(el => el.classList.remove('hidden'));
          }
          Array
              .from(document.querySelectorAll('.only-pro'))
              .forEach(el => el.classList.add('hidden'));
        }
      })
      .catch(err => {
        // No-op. Silent fail.
        console.log(`options.js::updateProFlowVisibilities - upgradeManager::checkLicense, silent fail`, err);
      });
}

function initializeApp(userConfig) {
  const optionsManager = new OptionsManager();
  optionsManager.initialize();

  const upgradeManager = new UpgradeManager(optionsManager, userConfig);

  const urlSearchParams = window.location.search;
  const justInstalled = urlSearchParams.includes('install=1');
  const justUpgradedPro = urlSearchParams.includes('upgraded=pro');
  const hasUrlLicense = urlSearchParams.includes('license=');

  if (userConfig.paidPro && justUpgradedPro) {
    Array.from(document.querySelectorAll('.only-just-upgraded-pro')).forEach(el => el.classList.remove('hidden'));
  }

  if (hasUrlLicense) {
    const code = urlSearchParams.substring(urlSearchParams.indexOf('=') + 1);
    upgradeManager
        .checkSetGMikeLicenseCode(code)
        .then(() => window.location.href = '/options.html?upgraded=pro')
        .catch(handleError);
  }

  let activeElement = null;
  if (justInstalled) {
    setOptionsPageTitle('pageTitleWelcome');
    document.querySelector('.just-installed').classList.remove('hidden');
    if (_TCAP_CONFIG.paidOnly) {
      optionsManager
          .setValue('requiresPaid', true)
          .catch(handleError);
    }
  } else {
    activeElement = 'options';

    setOptionsPageTitle('pageTitleOptions');
    document.querySelector('section.options-wrapper').classList.remove('hidden');
  }

  updateProFlowVisibilities(userConfig, upgradeManager);
  updateOSVis();

  // This is for filename template documentation.
  document.querySelector('span.date-var').innerText = _tcGetNowDateKey();

  new OptionsChrome(activeElement);
}

document.addEventListener('DOMContentLoaded', () => {
  getExtensionUserConfig()
      .then(userConfig => initializeApp(userConfig))
      .catch(handleError);
});
