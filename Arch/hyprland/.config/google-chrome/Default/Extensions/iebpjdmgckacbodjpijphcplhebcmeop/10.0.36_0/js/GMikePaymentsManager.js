
class GMikePaymentsManager {
  constructor(optionsManager, licenseCode, requiresPaid, errorHandler) {
    this.optionsManager_ = optionsManager;
    this.licenseCode_ = licenseCode;
    this.errorHandler_ = errorHandler;

    this.licensePurchaseUrl_ = (_TCAP_CONFIG.paidOnly && requiresPaid)
        ? _TCAP_CONFIG.xLicensePurchaseUrl
        : _TCAP_CONFIG.licensePurchaseUrl;
    this.licenseProduct_ = _TCAP_CONFIG.licenseProduct;
    this.licenseUrl_ = _TCAP_CONFIG.licenseUrl;
    this.manageLicenseUrl_ = _TCAP_CONFIG.manageLicenseUrl;
    this.adjacentProducts_ = _TCAP_CONFIG.adjacentProducts;

    // We need this even if we're not going through an upgrade flow (site frame).
    Array
        .from(document.querySelectorAll('.gmike-webstore-only'))
        .forEach(el => el.classList.remove('hidden'));
  }

  initialize() {
    document
        .querySelector('form.activation-form')
        .addEventListener('submit', e => {
          e.preventDefault();
          this.handleActivateFormSubmit_();
          return false;
        })
    document
        .querySelector('input.btn-text-activation')
        .addEventListener('click', this.handleActivateFormSubmit_.bind(this));

    Array
        .from(document.querySelectorAll('.btn-show-activation'))
        .forEach(el => el.addEventListener('click', this.handleShowActivation_.bind(this)));

    return Promise.resolve();
  }

  getPurchases() {
    return this.getActiveLicenses_(this.licenseCode_);
  }

  handleBuyButton() {
    window.open(this.licensePurchaseUrl_);
  }

  handleShowActivation_() {
    document.querySelector('.activation-wrapper').classList.remove('hidden');
  }

  isCloudLicense_({product}) {
    return _TCAP_CONFIG.cloudLicenseProducts.includes(product);
  }

  isLicenseProductAcceptable_({product}) {
    return this.adjacentProducts_.includes(product);
  }

  getActiveLicenses_(code) {
    return this
        .getLicenses_(code)
        .then(licenses => {
          if (!licenses || licenses.length == 0) {
            return Promise.resolve([]);
          }
          const now = new Date().getTime();
          licenses = licenses
              .filter(l => this.isLicenseProductAcceptable_(l))
              .filter(l => !l.cancelled)
              .filter(l => Number(l.expiration) > now);
          return Promise.resolve(licenses);
        });
  }

  getAllLicenses_(code, isActivate=false) {
    return this
        .getLicenses_(code, isActivate)
        .then(licenses => {
          const licenseMap = {
            active: [],
            expired: [],
            cancelled: [],
            all: licenses || [],
            cloud: [],
          };
          if (licenses && licenses.length) {
            const now = new Date().getTime();
            licenseMap.cancelled = licenses
                .filter(l => this.isLicenseProductAcceptable_(l))
                .filter(l => l.cancelled);
            licenseMap.expired = licenses
                .filter(l => this.isLicenseProductAcceptable_(l))
                .filter(l => !l.cancelled)
                .filter(l => Number(l.expiration) <= now);
            licenseMap.active = licenses
                .filter(l => this.isLicenseProductAcceptable_(l))
                .filter(l => !l.cancelled)
                .filter(l => Number(l.expiration) > now);
            licenseMap.cloud = licenseMap.active.filter(l => this.isCloudLicense_(l));
          }
          return Promise.resolve(licenseMap);
        });
  }

  getLicenses_(code, isActivate=false) {
    if (!code) {
      return Promise.resolve([]);
    }

    const url = `${this.licenseUrl_}/${code}?activate=${isActivate ? 1 : 0}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return response
              .json()
              .then(errResponse => {
                throw errResponse;
              });
        })
        .then(response => {
          if (response && response.licenses) {
            return resolve(response.licenses);
          }
          return resolve(null);
        })
        .catch(reject);
    });
  }

  setLicenseCode_(code) {
    this.licenseCode_ = code;
    return this.optionsManager_.setValue('licenseCode', code);
  }

  handleActivateFormSubmit_() {
    let val = (document.querySelector('input.text-activation').value || '').trim();
    if (!val) {
      return;
    }

    if (val.length < 12) {
      return this.handleError_(
          new Error('Unable to activate license.'), 'License code should be at least 12 characters long.');
    }

    this.setActivating_(true);
    this.checkSetLicenseCode(val)
        .then(() => window.location.href = '/options.html?upgraded=pro')
        .catch(err => this.handleError_(err))
        .finally(() => {
          this.setActivating_(false);
        });
  }

  checkSetLicenseCode(code) {
    return this
        .getAllLicenses_(code, true)
        .then(({active, cancelled, expired}) => {
          if (active && active.length) {
            return this.setLicenseCode_(code);
          }

          // Throw a meaningful message
          if (expired && expired.length) {
            throw new Error('License expired.');
          } else if (cancelled && cancelled.length) {
            throw new Error('License cancelled.');
          } else {
            throw new Error('Unable to activate license.');
          }
        });
  }

  setActivating_(activating) {
    const button = document.querySelector('form.activation-form input.btn');
    if (!button) {
      return;
    }
    button.disabled = activating;
    button.value = activating ? "Activating..." : "Activate";
  }

  handleError_(err, message) {
    this.errorHandler_ && this.errorHandler_(err, message);
  }
}
