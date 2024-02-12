class Component {
  constructor() {
    this.initialized = false;
    this.parent = null;
  }
  init() {
    this.initialized = true;
    this.oninit();
  }
  destory() {
    if (this.parent) {
      this.parent.removeChild(this);
      this.parent = null;
    }

    this.ondestory();
    this.oninit = this.ondestory = null;
  }
}

Component.prototype.oninit = new Function();
Component.prototype.ondestory = new Function();

export default Component;
