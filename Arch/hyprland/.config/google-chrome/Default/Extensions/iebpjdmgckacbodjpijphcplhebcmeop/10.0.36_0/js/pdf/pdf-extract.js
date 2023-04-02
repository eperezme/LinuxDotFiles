
function initializeApp(userConfig) {
  new OptionsChrome();

  const extractor = new PdfExtract(userConfig);
  extractor.initialize();
}

document.addEventListener('DOMContentLoaded', () => {
  getExtensionUserConfig()
      .then(userConfig => initializeApp(userConfig))
      .catch(err => {
        console.log(err);
      });
});
