const DEV_PRETEND_PRO = false;
const DEV_PRETEND_CLOUD = false;
const DEV_DEBUG = false;

const EXT_ID = "iebpjdmgckacbodjpijphcplhebcmeop";
const EXT_SLUG = "table-capture";
const LOG_KEY = "tcapLog";
const VERSION_TEXT = "v10.0.36C";
const RELEASE_NAME = "Nikola Jokić";

////

const _TCAP_EXTRACT_CONFIG_KEYS = [
  "addNewLinesForParagraphs",
  "csvDelimiter",
  "deleteEmptyRows",
  "extractImageSrc",
  "getLinkUrls",
  "ignoreHiddenPageElements",
  "ignoreHiddenTables",
  "ignoreImages",
  "moneyAsNumber",
  "numberAsNumber",
  "numDecimalChar",
  "numThousandChar",
];

const _TCAP_CLOUD_CONFIG_KEYS = [
  "hasCloud",
  "gptTokensConsumed",
];

const _TCAP_CLOUD_CONFIG_DEFAULTS = {
  hasCloud: false,
  gptTokensConsumed: 0,
};

const _TCAP_CONFIG_KEYS = [
  ..._TCAP_EXTRACT_CONFIG_KEYS,
  ..._TCAP_CLOUD_CONFIG_KEYS,
  "alwaysAllowColumnify",
  "copyImagesToClipboard",
  "enableGDriveWrite",
  "enablePastePrompt",
  "enableRequestSearch",
  "filenameTemplate",
  "renderRowPreview",
  "showDeveloperOptions",
  "singleSheetExcelExport",
  "useUnifiedPaging",
  // Payments and licensing
  "onboarded",
  "installDate",
  "licenseCode",
  "paidPro",
  "paidCloud",
  "requiresPaid",
  "googleAuthToken",
  "user",
  // Recipes
  "recipes",
];

const _TCAP_CONFIG_DEFAULTS = {
  addNewLinesForParagraphs: false,
  alwaysAllowColumnify: false,
  copyImagesToClipboard: false,
  csvDelimiter: ",",
  deleteEmptyRows: true,
  enableGDriveWrite: false,
  enablePastePrompt: true,
  enableRequestSearch: false,
  extractImageSrc: false,
  filenameTemplate: "",
  getLinkUrls: false,
  ignoreHiddenPageElements: true,
  ignoreHiddenTables: true,
  ignoreImages: false,
  moneyAsNumber: false,
  numberAsNumber: false,
  numDecimalChar: ".",
  numThousandChar: ",",
  renderRowPreview: true,
  showDeveloperOptions: false,
  singleSheetExcelExport: false,
  useUnifiedPaging: false,
  // Payments and licensing
  onboarded: false,
  installDate: null,
  licenseCode: null,
  paidPro: 0,
  paidCloud: 0,
  requiresPaid: false,
  user: {},
  googleAuthToken: null,
  // Recipes
  recipes: [],
  //
  ..._TCAP_CLOUD_CONFIG_DEFAULTS,
};

//// API

const BASE_API_URL = "https://georgemike.com/api";

////

const _TCAP_CONFIG = {
  releaseName: RELEASE_NAME,
  versionText: VERSION_TEXT,
  devPretendPro: DEV_PRETEND_PRO,
  devPretendCloud: DEV_PRETEND_CLOUD,
  devDebug: DEV_DEBUG,

  cookie: {
    tabId: "tableCaptureTab",
    install: "tableCaptureInstallTime",
    o365: "tableCaptureO365",
  },

  selectionEventKey: "sel-event",
  selectionAttemptKey: "sel-attempt",

  logKey: LOG_KEY,
  extBase: `chrome-extension://${EXT_ID}`,
  chromeExtBase: "chrome-extension://",

  // API
  api: {
    publishTable: `${BASE_API_URL}/table`,
    cloudSignup: `${BASE_API_URL}/licensing/charge/cloudsignup`,
    auth: `${BASE_API_URL}/licensing/charge/user/auth`,
    cloudLicenses: `${BASE_API_URL}/licensing/charge/user/cloudlicenses`,
    ping: `${BASE_API_URL}/licensing/charge/ping`,
  },

  // LICENSING & PAYMENTS
  paidOnly: false,
  cloudLicenseProducts: ["tablecapturecloud"],
  licenseProduct: "tablecapture",
  adjacentProducts: [
    "edgecapture",
    "foxcapture",
    // NOTE(gmike): This is the license product.
    "tablecapture",
    "tablecapturepro",
    "tablecapturelife",
    "tablecapturecloud",
    "tabletoexcel",
  ],
  cloudLicensePurchaseUrl: "https://georgemike.com/tablecapture/cloud/",
  xLicensePurchaseUrl:
    "https://georgemike.com/licensing?app=dGFibGVjYXB0dXJlcHJv",
  licensePurchaseUrlBase: "https://georgemike.com/licensing?app=",
  licensePurchaseUrl: "https://georgemike.com/licensing?app=dGFibGVjYXB0dXJlcHJv",
  licenseUrl: `${BASE_API_URL}/licensing/charge`,
  manageLicenseUrl: "https://georgemike.com/licensing/manage?key=",
  managePurchaseUrl: "https://georgemike.com/licensing/purchase?key=",

  // Links
  discordInvite: "https://discord.gg/JWzDVSNBgC",
  reviewLink: `https://chrome.google.com/webstore/detail/${EXT_SLUG}/${EXT_ID}/reviews`,
  supportMailTo: `mailto:support@georgemike.com?subject=Table%20Capture`,
  newsletterUrl: "http://eepurl.com/dmo_QT",
  newSheetsUrl: "http://spreadsheets.google.com/ccc?new=true",
  surveyUrl: "https://goo.gl/forms/0F5PHkDHut8ZYCmo1",
  roadmapUrl:
    "https://docs.google.com/document/d/10wM8tSyatRIlKGM7bYYBHLbfCZANuO5ewoX2SnC8HMs/edit",
  recipesDocUrl:
    "https://docs.google.com/document/d/1bxJNXozYSA_zld8QVA92QhSP5wUA5BMOC5A5h8HZm5o/edit",
  office365Link: "https://www.office.com/launch/excel?auth=2",
  airtableExtension: "https://chrome.google.com/webstore/detail/airtable-extractor-by-tab/jdldgiafancpgcleiodepocjobmmfjif",

  reportPageUrl: "https://georgemike.com/tables/report?d=$DATA",
  reportErrorUrl: "https://georgemike.com/tables/report?err=$ERROR",

  batchWait: 0.5 * 1000,
  selectionDataFullMaxCols: 8,
  selectionDataMaxCols: 4,
  selectionDataFullMaxRows: 25,
  selectionDataMaxRows: 3,
  minValidNumCells: 3,
  scrollInterval: 0.75 * 1000,
  dynPageInterval: 3 * 1000,
  autoPageWait: 3 * 1000,
  pagingRetryDelay: 1.5 * 1000,
  numPagingRetries: 4,

  rowIdAttr: "_tc-row-id",

  // CA$H
  maxPagingFreeDate: 20210227,

  //// CLOUD

  supportsCloud: true,
  sheetSyncWriteInterval: 10 * 1000,
  gptMockResponses: false,
  gptApiKey: "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",

  //// WATCHERS

  supportsWatchers: false,
};

const _TCAP_COPY_CONST = {
  rowSeparator: "\r\n",
  colSeparator: "\t",
};

const _TC_AD_NETWORK_HOSTNAME = ["googleads.g.doubleclick.net"];
const _TC_AD_NETWORK_PARTIALS = [".doubleclick.net", ".googlesyndication.com"];

// NOTE(gmike): This is mostly documentation
const _TC_OAUTH_IDS = {
  // Note: This is using this Extension ID: hdipbhfjpefabfogglieieacgbekefin
  dev: "1097367017052-trrb99o67tl9v060qcul5k2848da97t6.apps.googleusercontent.com",
  prod: "134705207172-cjqlrudj323jpldsf98sjmfaf2045b05.apps.googleusercontent.com",
};

// Google Cloud API Keys
const _TC_GSHEETS_API_KEY_PROD = 'AIzaSyBy8JE30kVReC4DIMyZela8qUpTnSxIz8E';
const _TC_GSHEETS_API_KEY_DEV = 'AIzaSyDTF0mqZwnIK9-3wbx4mvA3swly91x95v4';
const _TC_GSHEETS_API_KEY = _TC_GSHEETS_API_KEY_DEV;
