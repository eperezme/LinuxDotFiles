
class SelectionWrapper extends ElementWrapper {
  constructor(element, url, userConfig) {
    super(element, url, userConfig);

    this.elStack_ = [];
    this.treatAsTable_ = true;
    this.define_();
  }

  getTableId() {
    return this.def && this.def.id;
  }

  getRecipeDefinition() {
    return {
      name: "",
      description: "",
      urlRegex: `https:\/\/.*${window.location.host}\..*`,
      urlExample: window.location.href,
      selector: ``,
      disabled: false,
      autoClip: false,
    };
  }

  getReproOptions() {
    return {
      treatAsTable: this.treatAsTable_,
    };
  }

  setTreatAsTable(treatAsTable) {
    this.treatAsTable_ = treatAsTable;
  }

  define_ () {
    const element = this.dom.element;
    const {id, name, className, pathTo} = this.getDomAttributes_(element);

    this.def = {
      id,
      name,
      className,
      pathTo,
      rows: 0,
    };
    this.updateNumRows_();
  }

  updateDefine_() {
    const {id, name, className, pathTo} = this.getDomAttributes_(this.dom.element);
    this.def.id = id;
    this.def.name = name;
    this.def.className = className;
    this.def.pathTo = pathTo;
    this.updateNumRows_();
  }

  updateNumRows_() {
    this.def.rows = this.dom.element.childElementCount;
    // This is just an estimate.
    this.def.numCells = this.def.rows * 5;
  }

  selectParent() {
    let parent = this.dom.element.parentNode;
    if (!parent) {
      return;
    }

    this.unhighlight();

    while (parent && parent.childElementCount === 1) {
      parent = parent.parentNode;
    }

    if (!parent) {
      return;
    }

    this.elStack_.push(this.dom.element);
    this.dom.element = parent;
    this.updateDefine_();
    this.highlight();
  }

  selectPrevious() {
    if (this.elStack_.length == 0) {
      return;
    }

    this.unhighlight();
    this.dom.element = this.elStack_.pop();
    this.updateDefine_();
    this.highlight();
  }

  getAsArrays() {
    return TableUtil.arbNodeToAlignedArray(this.dom.element, this.userConfig_, this.treatAsTable_);
  }

  getAsString (outputFormat) {
    const alignedArray = this.getAsArrays();
    const str = TableUtil.arrayOfArraysToString(alignedArray, _TCAP_COPY_CONST.rowSeparator, _TCAP_COPY_CONST.colSeparator);
    return TableUtil.postProcessFinalString(str, outputFormat, _TCAP_COPY_CONST);
  }

  copy (outputFormat) {
    _tcLogTableWrapperMessageAction(this, MessageAction.COPY, outputFormat, this.userConfig_);
    return super.copy(outputFormat);
  }
}
