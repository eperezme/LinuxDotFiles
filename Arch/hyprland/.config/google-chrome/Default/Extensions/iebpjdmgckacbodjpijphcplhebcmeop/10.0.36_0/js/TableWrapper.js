
class TableWrapper extends ElementWrapper {
  constructor(table, url, windowName, userConfig) {
    super(table, url, userConfig);

    this.dom.table = table;
    // NOTE(gmike): This and .def get accessed directly.
    this.windowName = windowName;

    this.define_();
  }

  destroy () {
    super.destroy();
    this.removeInlineMenu();
  }

  getRecipeDefinition() {
    const baseRecipe = super.getRecipeDefinition();
    if (!baseRecipe.selector) {
      baseRecipe.fuzzySelector = true;
      baseRecipe.selector = "table";
    }
    return {
      ...baseRecipe,
    };
  }

  setTableIndex (tableIndex) {
    this.def.index = tableIndex;
  }

  inferTableIndex() {
    const matchingIndex = Array
        .from(document.querySelectorAll('table'))
        .filter(t => !t.classList.contains('tc-ignore'))
        .map((table, index) => ({table, tableIndex: index}))
        .filter(pair => pair.table === this.dom.table);
    if (matchingIndex.length === 1) {
      this.setTableIndex(matchingIndex[0].tableIndex);
    }
  }

  supportsInlineMenu() {
    return true;
  }
  
  getTableId() {
    return this.def.table.id;
  }

  isValid () {
    const numCells = this.def.numCells;
    if (numCells <= _TCAP_CONFIG.minValidNumCells) {
      return false;
    }

    // Ignore selection workshop tables.
    if (this.dom.table && this.dom.table.classList.contains('tc-ignore')) {
      return false;
    }

    // If the user wants to ignore hidden tables, don't show them.
    if (this.userConfig_.ignoreHiddenTables &&
        (this.dom.table.offsetHeight < 1 || this.dom.table.offsetWidth < 1)) {
      return false;
    }

    return this.def.table.columns !== 0
        && this.def.table.rows !== 0;
  }

  define_ () {
    const table = this.dom.table;
    const {id, adjustedId, pathTo} = this.getDomAttributes_(table);

    const rows = table.getElementsByTagName('TR');
    const nRows = rows.length;
    const nCols = this.getNumTableColumns_(rows);

    // Note: Trailing space is intended.
    const size = `(${nRows} x ${nCols}) `;

    this.def = {
      pathTo,
      numCells: nRows * nCols,
      table : {
        id : size + id,
        adjusted : size + adjustedId,
        rows : nRows,
        columns : nCols,
        windowName : this.windowName,
      },
    };
  }

  getNumTableColumns_(rows) {
    if (!rows || rows.length === 0) {
      return 0;
    }

    return Array
        .from(rows)
        .map(row => row.childElementCount)
        .sort((a, b) => b - a)[0];
  }

  screenshot() {
    _tcLogTableWrapperMessageAction(this, MessageAction.SCREENSHOT, null, this.userConfig_);
    return super.screenshot();
  }

  getAsString (outputFormat) {
    const str = TableUtil.tableNodeToString(
        this.dom.table,
        _TCAP_COPY_CONST.rowSeparator,
        _TCAP_COPY_CONST.colSeparator,
        this.userConfig_);
    return TableUtil.postProcessFinalString(str, outputFormat, _TCAP_COPY_CONST);
  }

  getAsArrays () {
    return TableUtil.nodeToArrays(
        this.dom.table,
        _TCAP_COPY_CONST.rowSeparator,
        _TCAP_COPY_CONST.colSeparator,
        this.userConfig_,
        true);
  }

  copy (outputFormat) {
    _tcLogTableWrapperMessageAction(this, MessageAction.COPY, outputFormat, this.userConfig_);
    return super.copy(outputFormat);
  }

  //// INLINE MENUS

  flashInlineMessage(message) {
    const wrapper = this.dom.inlineMenu.querySelector('._tc_inline_status_message');
    wrapper.innerText = message;
    wrapper.classList.remove('_tc_not_shown');
  }

  removeInlineMenu () {
    try {
      if (this.dom.inlineMenu) {
        this.dom.inlineMenu.remove();
        this.dom.inlineMenu = null;
      }
    } catch (err) {}
  }

  attachInlineMenu(inlineMenu) {
    if (this.dom.inlineMenu) {
      return;
    }

    // Set and update its position.
    const rect = this.dom.table.getBoundingClientRect();
    inlineMenu.style.top = (rect.top + window.scrollY - 16) + "px";
    inlineMenu.style.left = (rect.left + window.scrollX - 16) + "px";

    this.dom.inlineMenu = inlineMenu;
    document.body.appendChild(this.dom.inlineMenu);
  }
}
