import DisplayObject from "./DisplayObject";
import Root from "../core/Root";

class DisplayObjectContainer extends DisplayObject {
  constructor(cfg) {
    super()

    this.__childs = [];
    Root.extend(this, cfg);
  }
  init() {
    const childs = this.__childs;

    for (let i = 0, len = childs.length; i < len; i++) {
      const child = childs[i];
      if (!child.initialized) {
        child.init();
      }
    }
    super.init();
  }
  /**
   * @param {DisplayObject} child
   */
  appendChild(child) {
    this.addChildAt(child, this.__childs.length);
  }
  /**
   * @param {DisplayObject} child
   */
  prependChild(child) {
    this.addChildAt(child, 0);
  }
  /**
   * @param {DisplayObject} child
   * @param {Number} index
   */
  addChildAt(child, index) {
    child.parent = this;
    this.__childs.splice(index, 0, child);
  }
  /**
   * @param {DisplayObject} child
   */
  removeChild(child) {
    const childs = this.__childs;

    for (let i = 0, len = childs.length; i < len; i++) {
      if (childs[i] === child) {
        this.removeChildAt(i);
        break;
      }
    }
  }
  /**
   * @param {Number} index
   */
  removeChildAt(index) {
    const child = this.__childs.splice(index, 1);

    if (child) {
      child.parent = null;
    }
  }
  /**
   * @param {Number} index
   */
  removeAll() {
    this.__childs.length = 0;
  }
  /**
   * @param {Number} index
   */
  getChildAt(index) {
    return this.__childs[index];
  }
  getChilds() {
    return this.__childs;
  }
  /**
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    const childs = this.__childs;

    for (let i = 0, len = childs.length; i < len; i++) {
      if (childs[i]) {
        childs[i].update(deltaTime);
      }
    }

    super.update();
  }
  draw(context) {
    const childs = this.__childs;
    const len = childs.length;

    for (let i = 0; i < len; i++) {
      childs[i].render(context);
    }

    super.draw();
  }
  destoryChilds() {
    const childs = this.__childs;

    for (let i = 0, len = childs.length; i < len; i++) {
      childs[0].destory();
    }
  }
  destory() {
    this.destoryChilds();
    this.__childs = null;
    super.destory();
  }
}

export default DisplayObjectContainer;
