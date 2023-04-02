class AccountManager {
  constructor(userConfig) {
    this.userConfig_ = userConfig;
    this.authWrapper_ = new AuthWrapper();
    this.api_ = new GMikeAPI();
    this.browserEnv_ = new BrowserEnv();
  }

  initializeForAcountPage() {
    this.setLoading_(true);
    this.fetchAccountInfo_()
      .then((accountInfo) => this.render_(accountInfo))
      .catch((err) => this.handleError_(err, "Error fetching account info"))
      .finally(() => {
        this.setLoading_(false);
      });
  }

  setLoading_(loading) {
    // TODO(gmike): Implement.
  }

  getSetUserWithToken_(token, existingUser = {}) {
    if (existingUser && existingUser.email) {
      return Promise.resolve(existingUser);
    }

    return this.api_.getUserEmailWithToken(token).then((user) => {
      if (user) {
        return this.browserEnv_
          .getSyncStorageApi()
          .setP({ user })
          .then(() => user);
      }
      return {};
    });
  }

  fetchAccountInfo_() {
    const accountInfo = this.api_.createStubAccountInfo({
      user: this.userConfig_.user,
      authenticated: this.userConfig_.user && this.userConfig_.user.email,
    });

    if (!this.userConfig_.googleAuthToken) {
      return Promise.resolve(accountInfo);
    }

    return this.getSetUserWithToken_(
      this.userConfig_.googleAuthToken,
      this.userConfig_.user
    )
      .then((user) => {
        accountInfo.user = user;
        return this.api_.getCloudLicensesWithToken(
          this.userConfig_.googleAuthToken
        );
      })
      .then((cloudLicenseResponse) => {
        const processCloudLicenseResponse =
          this.api_.processCloudLicenseResponse(cloudLicenseResponse);
        return {
          ...accountInfo,
          ...processCloudLicenseResponse,
        };
      });
  }

  render_(accountInfo) {
    const licenseType = this.getLicenseSummary_();
    const wrapper = document.querySelector(".main-account-info-wrapper");
    wrapper.innerHTML = `
      <section>
        <div class="heading thin-title">Basic Info</div>
        <div class="pairs">
          <div class="pair">
            <div class="key">Installed:</div>
            <div class="value">${_tcFormatNowDateKey(
              this.userConfig_.installDate
            )}</div>
          </div>
          <div class="pair">
            <div class="key">License:</div>
            <div class="value">${licenseType}</div>
          </div>
          <div class="manage-url hidden">
            <a>Manage License Subscription</a>
          </div>
        </div>
      </section>
      <section class="authed-only">
        <div class="heading thin-title">Cloud Info</div>
        <div class="alert alert-warning">
          <a href="/cloud.html">Learn more</a> about Table Capture Cloud.
        </div>
        <div class="pairs">
          <div class="pair">
            <div class="value">${
              this.userConfig_.gptTokensConsumed
            } Magic Column Tokens Used</div>
          </div>
        </div>
      </section>
      <section class="authed-only tc-licenses-wrapper">
        <div class="heading thin-title">Table Capture Licenses <span class="license-count"></span></div>
        <div class="licenses-wrapper"></div>
      </section>
      <section class="authed-only gm-licenses-wrapper">
        <div class="heading thin-title">Other GeorgeMike.com Licenses <span class="license-count"></span></div>
        <div class="licenses-wrapper"></div>
      </section>
    `;

    const {
      nonTableCaptureLicenses,
      tableCaptureLicenses,
      activeCloudLicenses,
    } = accountInfo;
    wrapper.querySelector(
      ".tc-licenses-wrapper .license-count"
    ).innerHTML = `(${tableCaptureLicenses.length})`;
    wrapper.querySelector(
      ".gm-licenses-wrapper .license-count"
    ).innerHTML = `(${nonTableCaptureLicenses.length})`;

    const renderLicenseElement = (license) => {
      const status = this.api_.getLicenseStatusString(license);
      const licenseUrl = getTableCaptureLicenseManagementUrl(license);
      const productUrl =
        _TCAP_CONFIG.licensePurchaseUrlBase + btoa(license.product);
      const el = document.createElement("div");
      el.classList.add("license");
      el.innerHTML = `
        <a href="${productUrl}" class="tag" target="_blank">${
        license.productName
      }</a>
        <span class="tag ${status.toUpperCase()}">${status}</span>
        <a href="${licenseUrl}" class="tag" target="_blank">Code: ${
        license.code
      }</span>
      `;
      return el;
    };

    const tcLicensesWrapper = wrapper.querySelector(
      ".tc-licenses-wrapper .licenses-wrapper"
    );
    tableCaptureLicenses.forEach((license) => {
      const el = renderLicenseElement(license);
      tcLicensesWrapper.appendChild(el);
    });

    const gmLicensesWrapper = wrapper.querySelector(
      ".gm-licenses-wrapper .licenses-wrapper"
    );
    nonTableCaptureLicenses
      .sort((a, b) => (a.product < b.product ? -1 : 1))
      .forEach((license) => {
        const el = renderLicenseElement(license);
        gmLicensesWrapper.appendChild(el);
      });

    if (!this.userConfig_.googleAuthToken) {
      Array.from(wrapper.querySelectorAll(".authed-only")).forEach((el) =>
        el.classList.add("hidden")
      );
    }

    if (this.userConfig_.paidPro) {
      const manageLinkWrapper = document.querySelector(".manage-url");
      manageLinkWrapper.classList.remove("hidden");
      manageLinkWrapper.querySelector("a").href =
        getTableCaptureLicenseManagementUrl({
          code: this.userConfig_.licenseCode,
          product: "tablecapture",
        });
    }
  }

  getLicenseSummary_() {
    if (this.userConfig_.paidCloud) {
      return "Cloud";
    }

    if (this.userConfig_.paidPro) {
      return "Pro";
    }

    return "Free";
  }

  handleError_(err) {
    console.error(err);

    const message =
      err && err.message ? `Error caught: ${err.message}` : "Error caught!";
    const wrapper = document.querySelector(".global-errors");
    wrapper.appendChild(createAlertPane(message, "danger", true));
  }
}
