
const USER_QUERY_SELECTOR_PAGED_ELEMENT_KEY = "_tc-workshop-user-paged-element-query-selector";

class PagingListener {
  constructor(cbs) {
    this.cbs_ = cbs;

    this.paging_ = false;
    this.listening_ = false;
    this.elementWrapper_ = null;
    this.tabId_ = null;
    this.count_ = 0;
    this.data_ = null;
    this.popableData_ = null;
    this.treatAsTable_ = true;
    this.autoPageTable_ = false;
    this.firstPageSize_ = -1;

    this.clickedElementsTimeout_ = null;
    this.clickedElements_ = [];
    this.contextMenuElement_ = null;
    this.pagingElement_ = null;
  }

  destroy() {
    this.elementWrapper_ = null;
    this.pagingElement_ = null;
    this.setFirstPageSize(-1);
    this.setCount(0);
    this.stopPaging();
    this.maybeKillAutoPage_();
  }

  maybeKillAutoPage_() {
    this.autoPageTable_ = false;

    if (this.pageAdvanceTimeout_) {
      window.clearTimeout(this.pageAdvanceTimeout_);
      this.pageAdvanceTimeout_ = null;
    }

    this.updateAutoPageState_();
  }

  updateAutoPageState_() {
    const params = {
      action: MessageAction.AUTO_PAGING_UPDATE,
      autoPageTable: this.autoPageTable_,
    };
    new BrowserEnv()
        .sendMessage(params)
        .catch(err => _tcContentSwallowError(err, 'PagingListener::updateAutoPageState_()'));
  }

  isAutoPaging() {
    return this.autoPageTable_;
  }

  getFirstPageSize() {
    return this.firstPageSize_;
  }

  setFirstPageSize(firstPageSize) {
    this.firstPageSize_ = firstPageSize;
  }

  setContextMenuElement(contextMenuElement) {
    this.contextMenuElement_ = contextMenuElement;
  }

  setAutoPage(autoPageTable) {
    this.autoPageTable_ = autoPageTable;

    if (this.autoPageTable_) {
      this.updateAutoPageState_();
    } else {
      this.maybeKillAutoPage_();
    }
  }

  setTreatAsTable(treatAsTable) {
    this.treatAsTable_ = treatAsTable;
  }

  setPaging(paging) {
    this.paging_ = paging;
  }

  isPaging() {
    return this.paging_;
  }

  hasSubstantialData() {
    return this.data_ && this.data_.dataArray && this.data_.dataArray.length > 20;
  }

  getRowCount() {
    return this.data_ && this.data_.dataArray
        ? this.data_.dataArray.length
        : 0;
  }

  getData() {
    return this.data_;
  }

  getDataArray(outputFormat) {
    // TODO(gmike): Possibly transform/process.
    return this.data_.dataArray;
  }

  getDataArrayAsString_(outputFormat) {
    const str = TableUtil.arrayOfArraysToString(this.data_.dataArray, _TCAP_COPY_CONST.rowSeparator, _TCAP_COPY_CONST.colSeparator);
    return TableUtil.postProcessFinalString(str, outputFormat, _TCAP_COPY_CONST);
  }

  setData(data, popable=false) {
    this.data_ = JSON.parse(JSON.stringify(data));
    this.data_.dataArray = JSON.parse(JSON.stringify(this.data_.dataArray));

    if (popable) {
      this.popableData_ = JSON.parse(JSON.stringify(data));;
    }

    if (this.isPaging()) {
      const params = {
        action: MessageAction.PAGING_DATA_UPDATE,
        count: this.count_,
        firstPageSize: this.firstPageSize_,
        // NOTE(gmike): This has been stringified and parsed. Can be sent over the wire.
        data: this.data_,
      };
      new BrowserEnv()
          .sendMessage(params)
          .catch(err => _tcContentSwallowError(err, 'PagingListener::setData()'));
    }
  }

  popData() {
    if (this.popableData_) {
      this.data_ = JSON.parse(JSON.stringify(this.popableData_));
    }
  }

  setCount(count) {
    this.count_ = count;
  }

  getCount() {
    return this.count_;
  }

  setTabAndElementWrapper(tabId, elementWrapper) {
    this.tabId_ = tabId;
    this.elementWrapper_ = elementWrapper;
  }

  beginPagingListening() {
    this.clearPagedElementUserQuerySelector();
    this.listening_ = true;

    Array
        .from(document.querySelectorAll('*'))
        .forEach(el => this.waitForClick_(el));

    this.preStartPagingListen_();
  }

  clearPagedElementUserQuerySelector() {
    window.localStorage[USER_QUERY_SELECTOR_PAGED_ELEMENT_KEY] = "";
  }

  savePagedElementUserQuerySelector(selector) {
    window.localStorage[USER_QUERY_SELECTOR_PAGED_ELEMENT_KEY] = selector;
  }

  getPagedElementUserQuerySelector() {
    return window.localStorage[USER_QUERY_SELECTOR_PAGED_ELEMENT_KEY] || null;
  }

  useUserQuerySelector(selector) {
    const pagingEl = _tcGetSingleElementBySelector(selector);
    if (pagingEl) {
      this.recordPagingElement_(pagingEl, selector);
      _tcDoClick(pagingEl);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Either an element was not found or too many elements were.'));
  }

  stopPaging() {
    this.listening_ = false;
    this.paging_ = false;
    this.count_ = 0;

    const params = {
      tabId: this.tabId_,
      action: MessageAction.PAGING_LISTEN_STOP,
      host: window.location.host,
    };
    new BrowserEnv()
        .sendMessage(params)
        .catch(err => _tcContentSwallowError(err, 'PagingListener::stopPaging()'));
  }

  copy(outputFormat) {
    const params = {
      action : MessageAction.COPY_STRING,
      stringData : this.getDataArrayAsString_(outputFormat),
    };
    return new BrowserEnv().sendMessage(params);
  }

  waitForClick_(el) {
    // TODO(gmike): We may want to save these for removal later.
    const fn = this.handleClick_.bind(this, el);
    el.addEventListener('mousedown', fn);
  }

  handleClick_(el, e) {
    if (this.listening_ && this.elementWrapper_) {
      if (isNodeWorkshopChild(el) || el.nodeName === 'HTML' || el.nodeName === 'BODY') {
        // No-op.
      } else {
        if (this.clickedElementsTimeout_) {
          window.clearTimeout(this.clickedElementsTimeout_);
        }
        this.clickedElements_.push(el);
        this.clickedElementsTimeout_ = window.setTimeout(this.handleClickedElements_.bind(this), 50);
      }
    }
    return true;
  }

  handleClickedElements_() {
    if (this.clickedElements_ && this.clickedElements_.length) {
      if (this.contextMenuElement_ && this.clickedElements_.includes(this.contextMenuElement_)) {
        this.recordPagingElement_(this.contextMenuElement_);
      } else {
        const el = this.clickedElements_.shift();
        this.recordPagingElement_(el);
      }
    }
  }

  preStartPagingListen_() {
    if (!this.data_) {
      // NOTE(gmike): Not throwing on the pre-listen.
      return;
    }

    const { pathTo } = this.elementWrapper_.toJSON();
    const { rows, cols, dataArray } = this.data_;

    const params = {
      tabId: this.tabId_,
      action: MessageAction.PAGING_LISTEN_PRESTART,
      treatAsTable: this.treatAsTable_,
      autoPageTable: this.autoPageTable_,
      pathToElement: pathTo,
      count: this.count_,
      host: window.location.host,
      data: {rows, cols, dataArray},
    };
    new BrowserEnv()
        .sendMessage(params)
        .catch(err => _tcContentSwallowError(err, 'PagingListener::preStartPagingListen_()'));
  }

  recordPagingElement_(el, pagerSelector = "") {
    if (!this.data_) {
      throw new Error('Unable to begin paging');
    }

    this.pagingElement_ = el;
    const pathToPager = _tcExhaustiveGetPathsToPager(this.pagingElement_);
    const {pathTo} = this.elementWrapper_.toJSON();
    const {rows, cols, dataArray} = this.data_;

    const params = {
      tabId: this.tabId_,
      action: MessageAction.PAGING_LISTEN_START,
      pathToPager,
      pagerSelector,
      treatAsTable: this.treatAsTable_,
      autoPageTable: this.autoPageTable_,
      pathToElement: pathTo,
      count: this.count_,
      firstPageSize: this.firstPageSize_,
      host: window.location.host,
      data: {rows, cols, dataArray},
    };
    new BrowserEnv()
        .sendMessage(params)
        .catch(err => _tcContentSwallowError(err, 'PagingListener::recordPagingElement_()'));
  }

  tryNextPageNav(pathToPager, pagerSelector) {
    if (!this.isAutoPaging()) {
      // No-op.
      return Promise.resolve();
    }

    this.pageAdvanceTimeout_ = window.setTimeout(() => {
      const currentPageNum = _tcGetCurrentPageNumber();

      let pagingEl = null;

      // Prefer a user-provided selector if possible.
      if (pagerSelector) {
        pagingEl = _tcGetSingleElementBySelector(pagerSelector);
      }

      if (pagingEl === null) {
        if (currentPageNum !== null) {
          pagingEl = _tcGetNextPageElement(currentPageNum);
        }
        if (pagingEl === null) {
          pagingEl = _tcGetElementByXpath(pathToPager)
        }
      }

      if (pagingEl) {
        _tcDoClick(pagingEl);
      } else {
        this.cbs_.pagerMissing && this.cbs_.pagerMissing();
      }
    }, _TCAP_CONFIG.autoPageWait);
  }
}
