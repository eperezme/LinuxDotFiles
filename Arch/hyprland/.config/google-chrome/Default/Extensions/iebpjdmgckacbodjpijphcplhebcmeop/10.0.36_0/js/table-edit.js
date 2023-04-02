
function initializePage (userConfig) {
  new OptionsChrome();
  new TableEditor(userConfig).fetchAndRender();
}

document.addEventListener('DOMContentLoaded', () => {
  getExtensionUserConfig()
      .then(initializePage)
      .catch(err => {
        console.log(err);
      });
});
