class Tile {
  constructor() {
    this.slideStack_ = document.querySelector(".slide-stack");
    this.index_ = null;
  }

  setIndex(i) {
    this.index_ = i;
  }

  getIndex() {
    return this.index_;
  }

  trianglify_() {
    trianglifyElement(
      document.body,
      [
        "rgb(164, 234, 150)",
        "rgb(151, 206, 246)",
        "#ffe08a",
        "rgb(151, 206, 246)",
        "rgb(164, 234, 150)",
      ],
      false
    );
  }

  display(state) {
    throw new Error("Super class method not implemented");
  }

  getData() {
    throw new Error("Super class method not implemented");
  }

  getType() {
    throw new Error("Super class method not implemented");
  }

  hide() {
    document.querySelector(`.${this.getType()}`).classList.add("not-shown");
  }

  bindPageToTileState_(state) {
    const tileState = this.getData();
    if (tileState.triangles) {
      this.trianglify_();
    } else {
      clearTriangles(document.body);
    }

    this.setHash_(state);
    this.setPageTitle_(tileState.pageTitle || "Table Capture");
  }

  setHash_(hash) {
    const h = btoa(JSON.stringify(hash));
    window.location.hash = `h=${h}`;
  }

  setPageTitle_(title) {
    document.title = `${title}, Tour Table Capture`;
  }
}

class GenericIntroTile extends Tile {
  constructor(onAdvance, title, subTitle) {
    super(onAdvance);
    this.title_ = title;
    this.subTitle = subTitle;
  }
}
