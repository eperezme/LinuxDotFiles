

class ContentModal {
  constructor(frame, id, body) {
    this.frame_ = frame;
    this.frame_.addModal(id, this.render_(body));
  }

  render_(body) {
    const el = document.createElement('div');
    el.className = "_tc-modal-wrapper";
    el.innerHTML = `<div class="_tc-lb"></div>`;
    body.classList.add('_tc-modal-body');
    el.appendChild(body);
    return el;
  }

  show() {
    this.frame_.showModal();
  }

  hide() {
    this.frame_.hideModal();
  } 
}

class TCCloudUpdateModal {
  constructor(frame, message) {
    this.frame_ = frame;

    const body = document.createElement('div');
    body.innerHTML = `
      <div class="_tc-feature-disabled-modal">
        <div class="_tc-modal-heading">Table Capture <span>Cloud</span></div>
        <div class="_tc-modal-text highlighted">${message}</div>
        <div class="_tc-modal-text">
          Learn about the advanced features Table Capture Cloud offers.
        </div>
        <div class="_tc-modal-error-wrapper"></div>
        <div class="_tc-actions">
          <div>
            <div class="_tc-link _tc-link-cancel">Cancel</div>
          </div>
          <div>
            <TCButton class="learn-more-btn">Learn more</TCButton>
          </div>
        </div>
      </div>
    `;

    const modal = new ContentModal(this.frame_, "cloudupgrade", body);
    modal.show();

    body.querySelector('._tc-link-cancel').addEventListener('click', () => modal.hide());
    body.querySelector('.learn-more-btn').addEventListener('click', () => {
      window.open(chrome.extension.getURL("/cloud.html?ref=featuremodal"));
      modal.hide();
    });
  }
}

class TCDynamicOptionsModal {
  constructor(frame, userConfig, values, handlers) {
    this.frame_ = frame;
    this.userConfig_ = userConfig;

    const {firstRow, identityColumns} = values;
    this.identityColumns_ = identityColumns;

    const { onSave } = handlers;

    const body = document.createElement('div');
    body.innerHTML = `
      <div class="_tc-dynconfig-modal">
        <div class="_tc-modal-heading">Dynamic Table Capture Options</div>
        <div>
          <div class="tc-hidden _tc-identity-col-wrapper">
            <div class="_tc-form-control-wrapper">
              <label>Identity Columns</label>
              <div class="_tc-headers-list"></div>
              <div class="_tc-form-caption">
                Select the columns that should be unique to a row. This is used in "fingerprinting" rows such that 
                duplicate rows are not added. By default, all columns are used.
                <br /><br />
                Make sure to set your identity columns before you turn on dynamic table capture.
              </div>
            </div>
          </div>
        </div>
        <div class="_tc-modal-error-wrapper"></div>
        <div class="_tc-actions">
          <div>
            <div class="_tc-link _tc-link-cancel">Cancel</div>
          </div>
          <div>
            <TCButton class="save-options">Update</TCButton>
          </div>
        </div>
      </div>
    `;

    const modal = new ContentModal(this.frame_, "dyntableconfig", body);
    modal.show();

    body.querySelector('._tc-link-cancel').addEventListener('click', () => modal.hide());
    body.querySelector('.save-options').addEventListener('click', () => {
      onSave(this.getValues_());
      modal.hide();
    });

    if (firstRow) {
      // Show the panel.
      body.querySelector('._tc-identity-col-wrapper').classList.remove('tc-hidden');

      // Render headers as clickable tags.
      const headersList = body.querySelector('._tc-headers-list');
      firstRow.forEach((header, index) => {
        const el = document.createElement('span');
        if (header.trim()) {
          el.innerText = header;
          el.addEventListener('click', () => {
            this.toggleIdentityColumnSelection_(el, index);
          });
          if (this.identityColumns_.hasOwnProperty(String(index))) {
            el.classList.add('_tc-header-selected');
          }
        } else {
          el.style.display = 'none';
        }
        headersList.appendChild(el);
      });
    }
  }

  toggleIdentityColumnSelection_(el, columnIndex) {
    const columnIndexString = String(columnIndex);
    if (this.identityColumns_.hasOwnProperty(columnIndexString)) {
      delete this.identityColumns_[columnIndexString];
    } else {
      this.identityColumns_[columnIndexString] = true;
    }

    el.classList.toggle('_tc-header-selected', this.identityColumns_.hasOwnProperty(columnIndexString));
  }

  getValues_() {
    return {
      identityColumns: this.identityColumns_,
    };
  }
}
class TCBetaModal {
  constructor(frame, userConfig, handlers) {
    this.frame_ = frame;
    this.userConfig_ = userConfig;

    const body = document.createElement('div');
    body.innerHTML = `
      <div class="_tc-gsheets-modal">
        <div class="_tc-modal-heading">Beta Features</div>
        <div>
          <div class="_tc-feature-exp">
            <TCButton class="saveAsRecipe">Save As Recipe</TCButton>
            <p>
              When you invoke the Workshop, you're telling Table Capture what data you're interested in
              and what pages that table lives on. With this context, we can help you get started with a custom
              recipe that might perform some post-processing or add extra data from the page.
            </p>
          </div>
        </div>
        <div class="_tc-modal-error-wrapper"></div>
        <div class="_tc-actions">
          <div>
            <div class="_tc-link _tc-link-cancel">Done</div>
          </div>
          <div></div>
        </div>
      </div>
    `;

    const modal = new ContentModal(this.frame_, "gsheets", body);
    modal.show();

    body.querySelector('._tc-link-cancel').addEventListener('click', () => modal.hide());
    Object.keys(handlers).forEach(key => {
      body
          .querySelector(`TCButton.${key}`)
          .addEventListener('click', () => {
            handlers[key]();
          });
    });
  }
}

class TCGoogleSheetsModal {
  constructor(frame, sheetsSyncBridge, userConfig, handlers) {
    this.frame_ = frame;
    this.sheetsSyncBridge_ = sheetsSyncBridge;
    this.userConfig_ = userConfig;
    this.renderedSheets_ = [];

    // Default filename
    const defaultFilename = `Table Capture Cloud + ${window.location.hostname}`;
   
    const body = document.createElement('div');
    body.innerHTML = `
      <div class="_tc-gsheets-modal">
        <div class="_tc-modal-heading">Select from an open Google Sheet</div>
        <div>
          <select>
            <option value="">Select a Google Sheet</option>
          </select>
          <p>If you don't see your sheet in this list, find and open it in Google Drive and it'll be listed the next time you perform this action.</p>
          <div class="_tc-link _tc-link-advanced">Advanced</div>
          <div class="_tc-advanced-wrapper _tc-collapsed">
            <div class="_tc-form-control-wrapper">
              <label for="_tc-file-name">File Name</label>
              <input type="text" placeholder="File name" value="${defaultFilename}" id="_tc-file-name" />
            </div>
            <div class="_tc-form-control-wrapper">
              <label for="_tc-sheet-name">Sheet Name</label>
              <input type="text" placeholder="Sheet name" value="Sheet1" id="_tc-sheet-name" />
              <div class="_tc-form-caption">A sheet with this name will be created if it does not already exist.</div>
            </div>
          </div>
        </div>
        <div class="_tc-modal-error-wrapper"></div>
        <div class="_tc-actions">
          <div>
            <div class="_tc-link _tc-link-cancel">Cancel</div>
          </div>
          <div>
            <TCButton class="newSheet">Create New File</TCButton>
            <TCButton class="useSheet">Use Selected</TCButton>
          </div>
        </div>
      </div>
    `;

    const modal = new ContentModal(this.frame_, "gsheets", body);
    modal.show();

    const select = body.querySelector('select');
    const filenameInput = body.querySelector('._tc-advanced-wrapper input#_tc-file-name');
    const sheetnameInput = body.querySelector('._tc-advanced-wrapper input#_tc-sheet-name')

    this.sheetsSyncBridge_.getSheets()
        .then(sheetMap => {
          this.renderedSheets_ = Object
              .values(sheetMap)
              .filter(el => !el.hidden && !el.deleted);
          this.renderedSheets_.forEach(el => {
            const option = document.createElement('option');
            option.value = el.id;
            option.innerText = el.userTitle || el.title || el.pageTitle || el.id;
            select.appendChild(option);
          });
        });
    select.addEventListener("change", () => {
      if (select.selectedIndex === 0) {
        filenameInput.value = defaultFilename;
      } else {
        filenameInput.value = select.options[select.selectedIndex].innerText;
        this.updateSheetName_(select.selectedIndex - 1, sheetnameInput);
      }
    });
    
    body.querySelector('._tc-link-cancel').addEventListener('click', () => modal.hide());
    body.querySelector('._tc-link-advanced').addEventListener('click', () => {
      body.querySelector('._tc-advanced-wrapper').classList.remove('_tc-collapsed');
    });
    Object.keys(handlers).forEach(key => {
      body.querySelector(`TCButton.${key}`).addEventListener('click', () => {
        const advancedOptions = {
          filename: filenameInput.value.trim(),
          sheetName: sheetnameInput.value.trim(),
        };
        handlers[key](select.value, advancedOptions);
      });
    });
  }

  updateSheetName_(index, sheetnameInput) {
    const sheet = this.renderedSheets_[index];
    const sheetId = sheet.id;
    this.sheetsSyncBridge_
        .getSheetsInSpreadsheet(sheetId)
        .then(({sheets}) => {
          const firstSheet = sheets.filter(s => s.properties.index === 0);
          if (firstSheet.length > 0) {
            sheetnameInput.value = firstSheet[0].properties.title;
          }
        });
  }
}
