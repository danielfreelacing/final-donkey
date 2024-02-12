import DisplayObject from "./DisplayObject";
import Root from "../core/Root";

class Bitmap extends DisplayObject {
  constructor(cfg) {
    super()
    this.image = null;
    this.repeat = false;
    /**
     * @private
     */
    this.__pattern = null;
    Root.extend(this, cfg);
  }
  /**
   * @param {Context Object} context
   */
  draw(context) {
    if (this.repeat) {
      if (!this.__pattern) {
        this.__pattern = context.createPattern(this.image, "repeat");
      }
      context.fillStyle = this.__pattern;
      context.fillRect(0, 0, this.width, this.height);
    } else {
      context.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    }
    super.draw();
  }
  destory() {
    this.image = null;
    super.destory();
  }
}

export default Bitmap;
