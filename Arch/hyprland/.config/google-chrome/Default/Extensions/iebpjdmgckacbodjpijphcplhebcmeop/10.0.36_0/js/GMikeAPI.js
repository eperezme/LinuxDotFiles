
function getTableCaptureLicenseManagementUrl({code, product}) {
  if (product === "ade30") {
    return _TCAP_CONFIG.managePurchaseUrl + code;
  }
  return _TCAP_CONFIG.manageLicenseUrl + code;
}

////

class GMikeAPI {
  constructor() {
    this.checkJsonResponse_ = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    };
  }

  checkApiAvailability() {
    return new Promise((resolve) => {
      let timeout = window.setTimeout(() => {
        resolve(false);
      }, 2 * 1000);

      const url = _TCAP_CONFIG.api.ping;
      fetch(url)
          .then(response => {
            resolve(!!response.ok);
            if (timeout) {
              window.clearTimeout(timeout);
            }
          })
          .catch(err => resolve(false));
    });
  }

  getLicenseStatusString(license) {
    const now = new Date().getTime();
    const { cancelled, expiration } = license;
    if (cancelled) {
      return "Canceled";
    }
    if (Number(expiration) < now) {
      return "Expired";
    }
    return "Active";
  }

  createStubAccountInfo(accountInfo) {
    return {
      hasCloudLicenses: false,
      hasActiveCloudLicenses: false,
      activeCloudLicenses: [],
      activeLicenses: [],
      nonTableCaptureLicenses: [],
      tableCaptureLicenses: [],
      ...accountInfo,
    };
  }

  processCloudLicenseResponse(cloudLicenseResponse) {
    const now = new Date().getTime();

    const { cloudLicenses, licenses } = cloudLicenseResponse;
    const activeLicenses = licenses
        .filter(l => !l.cancelled)
        .filter(l => Number(l.expiration) > now);
    const activeTableCaptureLicenses = activeLicenses.filter(l => _TCAP_CONFIG.adjacentProducts.includes(l.product)) ?? [];
    const tableCaptureLicenses = licenses.filter(l => _TCAP_CONFIG.adjacentProducts.includes(l.product)) ?? [];
    const nonTableCaptureLicenses = licenses.filter(l => !_TCAP_CONFIG.adjacentProducts.includes(l.product)) ?? [];
    const activeCloudLicenses = cloudLicenses
        .filter(l => !l.cancelled)
        .filter(l => Number(l.expiration) > now) ?? [];
    return {
      hasCloudLicenses: !!cloudLicenses.length,
      hasActiveCloudLicenses: !!activeCloudLicenses.length,
      activeCloudLicenses,
      activeLicenses: activeTableCaptureLicenses,
      nonTableCaptureLicenses,
      tableCaptureLicenses,
    };
  }

  getCloudLicensesWithToken(token) {
    const url = _TCAP_CONFIG.api.cloudLicenses;
    const params = {
      method: 'POST',
      body: JSON.stringify({token}),
      headers:{'Content-Type': 'application/json'},
    };

    return fetch(url, params)
      .then(this.checkJsonResponse_)
      .catch(err => {
        return Promise.reject({err: err.message || "Unable to retrieve cloud licenses"});
      });
  }

  getUserEmailWithToken(token) {
    const url = _TCAP_CONFIG.api.auth;
    const params = {
      method: 'POST',
      body: JSON.stringify({token}),
      headers:{'Content-Type': 'application/json'},
    };

    return fetch(url, params)
      .then(this.checkJsonResponse_)
      .catch(err => {
        return Promise.reject({err: err.message || "Unable to get user email"});
      });
  }

  signupForCloud(bodyParams) {
    const url = _TCAP_CONFIG.api.cloudSignup;
    const params = {
      method: 'POST',
      body: JSON.stringify(bodyParams),
      headers:{'Content-Type': 'application/json'},
    };

    return fetch(url, params)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      });
  }

  persistPublicTable(publicTable) {
    publicTable.dataProvider = `Table Capture ${_TCAP_CONFIG.versionText}`;
    if (publicTable.tableDataArray) {
      const tableData = publicTable.tableDataArray;
      publicTable.rows = tableData.length;
      publicTable.columns = tableData.length && tableData[0].length;
      publicTable.tableData = JSON.stringify(tableData);
      delete publicTable.tableDataArray;
    }

    const url = _TCAP_CONFIG.api.publishTable;
    const params = {
      method: 'POST',
      body: JSON.stringify(publicTable),
      headers:{'Content-Type': 'application/json'},
    };

    return fetch(url, params)
      .then(this.checkJsonResponse_)
      .catch(err => {
        return Promise.reject({err: err.message || "Unable to save table."});
      });
  }
}
