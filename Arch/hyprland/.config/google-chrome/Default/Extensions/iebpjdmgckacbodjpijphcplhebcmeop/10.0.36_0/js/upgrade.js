
function initializePage (userConfig) {
  if (userConfig.requiresPaid && !userConfig.paidPro) {
    return window.location = '/activate.html'
  }

  new OptionsChrome();

  const optionsManager = new OptionsManager();
  const upgradeManager = new UpgradeManager(optionsManager, userConfig);
  upgradeManager.initializeForUpgrade();
}

document.addEventListener('DOMContentLoaded', () => {
  getExtensionUserConfig()
      .then(userConfig => initializePage(userConfig))
      .catch(err => {
        console.log(err);
      });
});
