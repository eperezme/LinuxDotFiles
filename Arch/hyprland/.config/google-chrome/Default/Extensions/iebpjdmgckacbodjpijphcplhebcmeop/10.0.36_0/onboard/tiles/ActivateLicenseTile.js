class ActivateLicenseTile extends Tile {
  constructor(state, { licenseCode, requiresPaid }) {
    super();
    this.hasExistingLicense_ = !state.plan;

    this.paymentsManager_ = new GMikePaymentsManager(
      new OptionsManager(),
      licenseCode,
      requiresPaid,
      this.handleError_.bind(this)
    );
  }

  getData() {
    return {
      existingLicense: this.hasExistingLicense_,
      triangles: true,
      pageTitle: "License Activation",
    };
  }

  getType() {
    return SlideTypes.ACTIVATE_LICENSE;
  }

  display(state) {
    this.hasExistingLicense_ = !state.plan;
    this.bindPageToTileState_(state);

    const slideType = this.getType();
    const existingSlide = document.querySelector(`.${slideType}`);
    if (existingSlide) {
      existingSlide.classList.remove("not-shown");
      existingSlide.classList.add("shown");
      return;
    }

    const title = this.hasExistingLicense_
      ? "Use your existing license"
      : "Start your trial";
    const subtitle = this.hasExistingLicense_
      ? `Reactivate Table Capture Pro below.`
      : `In a few seconds (<span class="countdown")>5</span>), a new tab will open where you can start your Table Capture Pro trial.`;

    const slide = document.createElement("div");
    slide.className = `scroll-slide ${slideType}`;
    slide.innerHTML = `
      <div class="container">
        <div class="big-text">${title}</div>
        <div class="sub-text">${subtitle}</div>
        <form class="activation-form">
          <div class="form-heading">Activate your license</div>
          <div class="form-group form-group-lg">
            <input
                type="text"
                id="activation"
                name="activation"
                maxlength="12"
                class="form-control input-lg text-activation"
                placeholder="Paste in your license code here" />
            <div class="form-control-caption">
              You may want to check your inbox (and spam folder) for emails from: <span class="mono">g@georgemike.com</span>
            </div>
          </div>
          <input
              type="button"
              class="btn btn-success btn-lg btn-text-activation"
              value="Activate" />
          <div class="error-wrapper"></div>
        </form>
      </div>
    `;

    slide
      .querySelector(".btn-text-activation")
      .addEventListener("click", () => {
        this.handleLicenseActivation_();
      });

    this.slideStack_.appendChild(slide);
    window.setTimeout(() => {
      slide.classList.add("shown");
    }, 250);

    if (this.hasExistingLicense_) {
    } else {
      this.startCountdown_();
    }
  }

  startCountdown_() {
    const countdownEl = document.querySelector("span.countdown");

    let time = 5;
    let intervalId = window.setInterval(() => {
      if (intervalId && time === 0) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      countdownEl.innerText = time;
      time--;
    }, 1000);
    let timeoutId = window.setTimeout(() => {
      timeoutId = null;
      window.open(_TCAP_CONFIG.xLicensePurchaseUrl);
    }, (time + 1) * 1000);

    countdownEl.addEventListener("click", () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
        countdownEl.innerText = "...";
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    });
  }

  handleLicenseActivation_() {
    const licenseCode = document.querySelector(".text-activation").value.trim();
    if (!licenseCode) {
      return this.handleError_(new Error("Please enter a license code."));
    }
    if (licenseCode.length !== 12) {
      return this.displayError_(
        new Error("Please provide a valid license code.")
      );
    }

    this.setActivating_(true);
    this.paymentsManager_
      .checkSetLicenseCode(licenseCode)
      .then(() => {
        window.location.href = "/options.html?onboarded=activated&upgraded=pro";
      })
      .catch((err) => this.handleError_(err))
      .finally(() => {
        this.setActivating_(false);
      });
  }

  setActivating_(activating) {
    const button = document.querySelector("form.activation-form input.btn");
    if (!button) {
      return;
    }
    button.disabled = activating;
    button.value = activating ? "Activating..." : "Activate";
  }

  handleError_(error, message = null) {
    const el = document.createElement("div");
    el.className = "alert alert-danger";
    el.innerText = message || error.message;

    const errorWrapper = document.querySelector(".error-wrapper");
    errorWrapper.appendChild(el);

    el.addEventListener("click", () => {
      el.remove();
    });
  }
}
