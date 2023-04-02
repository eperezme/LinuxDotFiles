
function initializeApp(userConfig) {
  new OptionsChrome("account");

  const manager = new AccountManager(userConfig);
  manager.initializeForAcountPage();
}

document.addEventListener('DOMContentLoaded', () => {
  getExtensionUserConfig()
      .then(userConfig => initializeApp(userConfig))
      .catch(err => {
        console.log(err);
      });
});
