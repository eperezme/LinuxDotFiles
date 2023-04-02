
/** A manager of options. */
class OptionsManager {
  constructor() {
    this.defaults_ = JSON.parse(JSON.stringify(_TCAP_CONFIG_DEFAULTS));
    this.nonFormOptions_ = {...this.defaults_};
    this.browserEnv_ = new BrowserEnv();
  }

  initialize() {
    this.bindToOptions_(this.defaults_);

    document
        .querySelector('form.extension-options')
        .addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSave_();
          return false;
        });

    Array
        .from(document.querySelectorAll('.more-action-wipe'))
        .forEach(el => el.addEventListener('click', () => {
          this.revertToDefaults_();
        }));

    Array
        .from(document.querySelectorAll('.btn-save'))
        .forEach(btn => btn.addEventListener('click', this.handleSave_.bind(this)));
  }

  handleSave_() {
    this.persist_(this.getValues_())
        .then(() => {
          this.showSaveMessage_('Saved');
          window.location.href = "#";
        });
  }

  revertToDefaults_() {
    this.persist_(this.defaults_)
        .then(() => {
          window.location.reload();
        });
  }

  getValues_() {
    const values = {
      ...this.nonFormOptions_,
      addNewLinesForParagraphs: !!document.querySelector('input.new-lines-for-paras-checkbox').checked,
      alwaysAllowColumnify: !!document.querySelector('input.always-allow-columnify-checkbox').checked,
      copyImagesToClipboard: !!document.querySelector('input.copy-images-to-clip-checkbox').checked,
      csvDelimiter: document.querySelector('input#csv-delimiter').value || ',',
      deleteEmptyRows: !!document.querySelector('input.delete-empty-rows-checkbox').checked,
      enableGDriveWrite: !!document.querySelector('input.enable-gdrive-write-checkbox').checked,
      enablePastePrompt: !!document.querySelector('input.enable-paste-prompt-checkbox').checked,
      extractImageSrc: !!document.querySelector('input.img-src-checkbox').checked,
      filenameTemplate: document.querySelector('input#filename-template').value || '',
      getLinkUrls : !!document.querySelector('input.get-links-checkbox').checked,
      ignoreHiddenPageElements: !!document.querySelector('input.ignore-hidden-checkbox').checked,
      ignoreHiddenTables: !!document.querySelector('input.ignore-hidden-tables-checkbox').checked,
      ignoreImages: !!document.querySelector('input.ignore-images-checkbox').checked,
      moneyAsNumber: !!document.querySelector('input.money-number-checkbox').checked,
      numberAsNumber: !!document.querySelector('input.number-as-number-checkbox').checked,
      numDecimalChar: document.querySelector('input#num-decimal-char').value || '.',
      numThousandChar: document.querySelector('input#num-thousand-char').value || ',',
      renderRowPreview: !!document.querySelector('input.row-preview-checkbox').checked,
      showDeveloperOptions: !!document.querySelector('input.enable-developer-options-checkbox').checked,
      singleSheetExcelExport: !!document.querySelector('input.single-sheet-excel-checkbox').checked,
      useUnifiedPaging: !!document.querySelector('input.use-unified-paging-checkbox').checked,
    };

    // Validate & default chars
    if (values.numDecimalChar && values.numDecimalChar.length > 1) {
      values.numDecimalChar = values.numDecimalChar[0];
    }

    if (values.numThousandChar && values.numThousandChar.length > 1) {
      values.numThousandChar = values.numThousandChar[0];
    }

    // If they're the same, default them.
    if (values.numDecimalChar === values.numThousandChar && values.numThousandChar) {
      values.numDecimalChar = ".";
      values.numThousandChar = ",";
    }

    return values;
  }

  persist_(options) {
    return this.browserEnv_
        .getSyncStorageApi()
        .setP(options);
  }

  bindToOptions_(defaultOptions) {
    this.browserEnv_
        .getSyncStorageApi()
        .getP(defaultOptions)
        .then(optionsValues => {
          if (!optionsValues) {
            return;
          }

          // NOTE(gmike, 4/2/2021): Backwards compat for typo.
          if (optionsValues.bindToClipbard === true) {
            optionsValues.bindToClipboard = true;
          }

          Object
              .keys(optionsValues)
              .forEach(optionKey => {
                this.bindToValue_(optionKey, optionsValues[optionKey]);
              });
        });

    document
        .querySelector('.alert-save-worked')
        .addEventListener("click", () => this.hideSaveMessage_());
  }

  setValue(key, value) {
    const valueObject = {};
    valueObject[key] = value;
    
    this.bindToValue_(key, value);
    return this.browserEnv_
        .getSyncStorageApi()
        .setP(valueObject);
  }

  bindToValue_(key, value) {
    switch (key) {
      case 'addNewLinesForParagraphs':
        document.querySelector('input.new-lines-for-paras-checkbox').checked = value;
        break;
      case 'alwaysAllowColumnify':
        document.querySelector('input.always-allow-columnify-checkbox').checked = value;
        break;
      case 'copyImagesToClipboard':
        document.querySelector('input.copy-images-to-clip-checkbox').checked = value;
        break;
      case 'csvDelimiter':
        document.querySelector('input#csv-delimiter').value = value;
        break;
      case 'deleteEmptyRows':
        document.querySelector('input.delete-empty-rows-checkbox').checked = value;
        break;
      case 'enableGDriveWrite':
        document.querySelector('input.enable-gdrive-write-checkbox').checked = value;
        break;
      case 'enablePastePrompt':
        document.querySelector('input.enable-paste-prompt-checkbox').checked = value;
        break;
      case 'extractImageSrc':
        document.querySelector('input.img-src-checkbox').checked = value;
        break;
      case 'filenameTemplate':
        document.querySelector('input#filename-template').value = value;
        break;
      case 'getLinkUrls':
        document.querySelector('input.get-links-checkbox').checked = value;
        break;
      case 'ignoreHiddenPageElements':
        document.querySelector('input.ignore-hidden-checkbox').checked = value;
        break;
      case 'ignoreHiddenTables':
        document.querySelector('input.ignore-hidden-tables-checkbox').checked = value;
        break;
      case 'ignoreImages':
        document.querySelector('input.ignore-images-checkbox').checked = value;
        break;
      case 'moneyAsNumber':
        document.querySelector('input.money-number-checkbox').checked = value;
        break;
      case 'numberAsNumber':
        document.querySelector('input.number-as-number-checkbox').checked = value;
        break;
      case 'numDecimalChar':
        document.querySelector('input#num-decimal-char').value = value;
        break;
      case 'numThousandChar':
        document.querySelector('input#num-thousand-char').value = value;
        break;
      case 'renderRowPreview':
        document.querySelector('input.row-preview-checkbox').checked = value;
        break;
      case 'showDeveloperOptions':
        document.querySelector('input.enable-developer-options-checkbox').checked = value;
        break;
      case 'singleSheetExcelExport':
        document.querySelector('input.single-sheet-excel-checkbox').checked = value;
        break;
      case 'useUnifiedPaging':
        document.querySelector('input.use-unified-paging-checkbox').checked = value;
        break;
      default:
        this.nonFormOptions_[key] = value;
        break;
    }
  }

  hideSaveMessage_() {
    document.querySelector('.alert-save-worked').style.display = 'none';
  }

  showSaveMessage_() {
    document.querySelector('.alert-save-worked').style.display = 'block';
  }
}
