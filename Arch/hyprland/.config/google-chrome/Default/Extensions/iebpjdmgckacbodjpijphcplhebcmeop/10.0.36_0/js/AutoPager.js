
class AutoPager {
  constructor() {
    this.listening_ = false;
    this.on_ = false;
    this.clickedElements_ = [];
    this.onOnAction_ = null;
    this.onAutoPagingError_ = null;
    this.onAutoPagingWarning_ = null;
    this.userPagerSelector_ = null;

    // Timeouts
    this.clickedElementsTimeout_ = null;
    this.pagingRetryTimeout_ = null;
    this.likelyPagerErrorTimeout_ = null;
  }

  isOn() {
    return this.on_;
  }

  isOnIsh() {
    return this.on_ || (this.clickedElements_ && this.clickedElements_.length && !!this.clickedElementsTimeout_);
  }

  turnOff() {
    this.on_ = false;
    this.listening_ = false;
    this.clickedElements_ = [];
    this.userPagerSelector_ = null;

    if (this.clickedElementsTimeout_) {
      window.clearTimeout(this.clickedElementsTimeout_);
      this.clickedElementsTimeout_ = null;
    }

    if (this.advanceTimeout_) {
      window.clearTimeout(this.advanceTimeout_);
      this.advanceTimeout_ = null;
    }

    if (this.pagingRetryTimeout_) {
      window.clearTimeout(this.pagingRetryTimeout_);
      this.pagingRetryTimeout_ = null;
    }
  }

  useRecipeNextPageSelector(selector) {
    const pagingEl = _tcGetSingleElementBySelector(selector);
    if (pagingEl) {
      this.userPagerSelector_ = selector;
      this.pagingEl_ = pagingEl;
      this.on_ = true;
      _tcDoClick(pagingEl);
      return Promise.resolve();
    }
    return Promise.reject(new Error(`Either the recipe's paging element was not found or too many elements were found.`));
  }

  useUserQuerySelector(selector) {
    const pagingEl = _tcGetSingleElementBySelector(selector);
    if (pagingEl) {
      this.userPagerSelector_ = selector;
      _tcDoClick(pagingEl);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Either an element was not found or too many elements were found.'));
  }

  setAutoPagingWarningHandler(onAutoPagingWarning) {
    this.onAutoPagingWarning_ = onAutoPagingWarning;
  }

  setAutoPagingErrorHandler(onAutoPagingError) {
    this.onAutoPagingError_ = onAutoPagingError;
  }

  beginListeningForAdvance() {
    this.listening_ = true;

    Array
        .from(document.querySelectorAll('*'))
        .forEach(el => this.waitForClick_(el));
  }

  waitForClick_(el) {
    // TODO(gmike): We may want to save these for removal later.
    const fn = this.handleClick_.bind(this, el);
    el.addEventListener('mousedown', fn);
  }

  handleClick_(el, e) {
    if (this.listening_) {
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
      const el = this.clickedElements_.shift();
      this.pagingEl_ = el;
      this.on_ = true;
      
      if (this.onOnAction_) {
        this.onOnAction_();
        this.onOnAction_ = null;
      }
    }
    this.clickedElementsTimeout_ = null;
  }

  advanceEventually({delta, count}) {
    if (this.advanceTimeout_) {
      window.clearTimeout(this.advanceTimeout_);
      this.advanceTimeout_ = null;
    }

    // This happens slower than the auto-paging so that if we actually
    // do auto-page, it'll clear.
    if (delta !== 0) {
      if (this.likelyPagerErrorTimeout_) {
        window.clearTimeout(this.likelyPagerErrorTimeout_);
      } else {
        if (delta === count || 2 * delta === count) {
          this.likelyPagerErrorTimeout_ = window.setTimeout(() => {
            // TODO(i18n)
            const err = new Error("The 'next page' button was likely not found.");
            this.onAutoPagingWarning_ && this.onAutoPagingWarning_(err, "LIKELY_PAGER_ERROR");
          }, _TCAP_CONFIG.dynPageInterval * 2);
        }
      }
    }

    this.advanceTimeout_ = window.setTimeout(() => {
      this.advanceTimeout_ = null;

      if (this.on_) {
        this.advance_();
      } else {
        this.onOnAction_ = this.advance.bind(this);
      }
    }, _TCAP_CONFIG.dynPageInterval);
  }

  advance_() {
    if (this.listening_) {
      this.listening_ = false;
    }

    try {
      if (this.userPagerSelector_) {
        return this.retryAutoPaging_(0);
      }

      if (this.pagingEl_ && !this.pagingEl_.isConnected) {
        this.maybeUpdatePagingEl_();
      }

      if (!this.pagingEl_) {
        // No-op.
        return;
      }

      if (!this.pagingEl_.isConnected) {
        // TODO(i18n)
        const err = new Error("The 'next page' button wasn't found.");
        this.onAutoPagingWarning_ && this.onAutoPagingWarning_(err, "DISCONNECTED");
      }

      _tcDoClick(this.pagingEl_);
    } catch (err) {
      // No-op.
    }
  }

  retryAutoPaging_(retryCount) {
    if (this.pagingRetryTimeout_) {
      window.clearTimeout(this.pagingRetryTimeout_);
      this.pagingRetryTimeout_ = null;
    }

    if (retryCount < _TCAP_CONFIG.numPagingRetries) {
      // Exponential back-off.
      const timeoutDuration = Math.pow(2, retryCount) * _TCAP_CONFIG.pagingRetryDelay;

      this.pagingRetryTimeout_ = window.setTimeout(() => {
        this.pagingRetryTimeout_ = null;

        const newEl = _tcGetSingleElementBySelector(this.userPagerSelector_);
        if (newEl) {
          this.pagingEl_ = newEl;
          _tcDoClick(this.pagingEl_);
        } else {
          this.retryAutoPaging_(retryCount + 1);
        }
      }, timeoutDuration);
    }
  }

  // Attempts to find a connected paging element.
  maybeUpdatePagingEl_() {
    if (!this.pagingEl_) {
      return;
    }

    if (this.pagingEl_.id) {
      const selector = `#${this.pagingEl_.id}`;
      const newEl = document.querySelector(selector);
      if (newEl) {
        this.pagingEl_ = newEl;
        return;
      }
    }

    if (this.pagingEl_.className) {
      // SVG's have className that isn't a string.
      if (typeof this.pagingEl_.className === 'string') {
        const selector = "." + this.pagingEl_.className.split(' ').join('.');
        const newPagingEl = _tcGetSingleElementBySelector(selector, this.pagingEl_.innerText);
        if (newPagingEl) {
          this.pagingEl_ = newPagingEl;
          return;
        }
      }
    }
  }
}
