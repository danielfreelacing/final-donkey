import DisplayObjectContainer from "./DisplayObjectContainer";
import DisplayObject from "./DisplayObject";

class Layer extends DisplayObjectContainer {
  constructor() {
    super();
    this.viewport = null;
    this.distance = 1;
    /**
     * @private
     */
    this.__canvas = null;
    /**
     * @private
     */
    this.__context = null;
    /**
     * @private
     */
    this.__change = true;
  }
  init() {
    const childs = this.__childs;
    const len = childs.length;

    for (let i = 0; i < len; i++) {
      const child = childs[i];

      child.x /= this.distance;
      child.y /= this.distance;

      if (!child.initialized) {
        child.init();
      }
    }

    DisplayObject.prototype.init.call(this);
  }
  /**
   * 设置画布
   */
  setCanvas(canvas) {
    if (typeof canvas === "string") {
      canvas = document.getElementById(canvas);
    }

    if (canvas && canvas.getContext) {
      this.__canvas = canvas;
      this.__context = canvas.getContext("2d");
    }
  }
  /**
   * 清空画布
   */
  clear() {
    if (this.__change) {
      this.__context.clearRect(0, 0, this.__canvas.width, this.__canvas.height);
    }
  }
  /**
   * 改变分层状态
   */
  change() {
    this.__change = true;
  }
  /**
   * render
   */
  render() {
    if (this.__change) {
      super.render(this.__context);
      this.__change = false;
    }
  }
  /**
   * @param {Context Object} context
   */
  draw(context) {
    const childs = this.__childs;
    const len = childs.length;
    const viewport = this.viewport;
    const vx = viewport.x / this.distance,
      vy = viewport.y / this.distance,
      vw = viewport.width,
      vh = viewport.height;

    for (let i = 0; i < len; i++) {
      const child = childs[i],
        cx = child.x,
        cy = child.y,
        cw = child.width,
        ch = child.height;

      if (
        Math.abs(cx + cw / 2 - (vx + vw / 2)) < (cw + vw) / 2 &&
        Math.abs(cy + ch / 2 - (vy + vh / 2)) < (ch + vh) / 2
      ) {
        child.x = cx - vx;
        child.y = cy - vy;

        child.render(context);

        child.x = cx;
        child.y = cy;
      }
    }

    DisplayObject.prototype.draw.call(this);
  }
  /**
   * destory
   */
  destory() {
    this.viewport = this.__canvas = this.__context = null;
    super.destory();
  }
}

export default Layer;
