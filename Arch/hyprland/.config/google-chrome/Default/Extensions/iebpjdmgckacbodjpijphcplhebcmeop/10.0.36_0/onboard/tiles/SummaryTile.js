class SummaryTile extends Tile {
  constructor(onLicenseActivation) {
    super();
    this.onLicenseActivation_ = onLicenseActivation;
    this.completed_ = false;
  }

  getData() {
    return {
      summaryCompleted: this.completed_,
      triangles: true,
      pageTitle: "Summary",
    };
  }

  getType() {
    return SlideTypes.SUMMARY;
  }

  display(state) {
    this.bindPageToTileState_(state);

    const slideType = this.getType();
    const existingSlide = document.querySelector(`.${slideType}`);
    if (existingSlide) {
      existingSlide.classList.remove("not-shown");
      existingSlide.classList.add("shown");
      return;
    }

    const slide = document.createElement("div");
    slide.className = `slide padded-slide ${slideType}`;
    slide.innerHTML = `
      <div class="big-text">Thank You.</div>
      <div class="sub-text">You're ready for the next step!</div>
      <section>
        <div class="tag-list"></div>
      </section>
      <section>
        <div class="sub-heading">Next steps.</div>
        <input type="button" class="btn btn-lg btn-lfg" value="Let's go" />
        <div class="next-explanation"></div>
      </section>
    `;

    slide.querySelector(".btn-lfg").addEventListener("click", () => {
      this.handleNextSteps_(state);
    });

    const tags = [
      { key: "Experience", value: state.prettyExperience.short },
      { key: "Usage type", value: state.prettyUserType.short },
      {
        key: "Tutorial",
        value: state.tutorialSkipped ? "Skipped (it's okay)" : "Completed",
      },
      { key: "Plan", value: state.prettyPlan.short },
    ];

    const tagList = slide.querySelector(".tag-list");
    tags.forEach((tagDef) => {
      const el = document.createElement("div");
      el.className = "tag-thing";
      el.innerHTML = `
        <div class="prefix">${tagDef.key}</div>
        <div class="value">${tagDef.value}</div>
      `;
      tagList.appendChild(el);
    });

    this.slideStack_.appendChild(slide);
    window.setTimeout(() => {
      slide.classList.add("shown");
    }, 250);

    const explanationWrapper = slide.querySelector(".next-explanation");
    if (state.plan === "free") {
      explanationWrapper.innerHTML = `You're finished with our onboarding. You can either close this tab or click the button above to customize Table Capture for your needs.`;
    } else if (state.plan === "pro") {
      explanationWrapper.innerHTML = `All that's left is to start your Table Capture Pro trial.`;
    } else {
      // TODO(gmike): Cloud
    }
  }

  handleNextSteps_(state) {
    if (state.plan === "free") {
      window.location.href = "/options.html";
    } else if (state.plan === "pro") {
      this.onLicenseActivation_();
    } else {
      // User signs-in with Google
      // Open a modal that will instruct folks that GeorgeMike.com is going to be opened in a new tab
    }
  }
}
