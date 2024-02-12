import Component from "./Component";

class DisplayObject extends Component {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.alpha = 1;
    this.rotation = 0;
    this.flipX = false;
    this.flipY = false;
    this.scaleX = 1;
    this.scaleY = 1;
    /**
     * read only
     */
    this.visible = true;
  }
  show() {
    this.visible = true;
    this.onshow();
  }
  /**
   */
  hide() {
    this.visible = false;
    this.onhide();
  }
  /**
   * @param {Number} deltaTime
   */
  update() {
    if (this.onupdate) {
      this.onupdate();
    }
  }
  /**
   * @private
   */
  __transform(context) {
    context.translate(this.x, this.y);

    if (this.alpha < 1) {
      context.globalAlpha = this.alpha;
    }

    if (this.rotation % 360 > 0) {
      const offset = [this.width / 2, this.height / 2];
      context.translate(offset[0], offset[1]);
      context.rotate(((this.rotation % 360) / 180) * Math.PI);
      context.translate(-offset[0], -offset[1]);
    }

    if (this.flipX || this.flipY) {
      context.translate(
        this.flipX ? this.width : 0,
        this.flipY ? this.height : 0
      );
      context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);
    }

    if (this.scaleX != 1 || this.scaleY != 1) {
      context.scale(this.scaleX, this.scaleY);
    }
  }
  /**
   * @param {Context Object} context
   */
  render(context) {
    if (!this.visible || this.alpha <= 0) {
      return false;
    }
    context.save();
    this.__transform(context);
    this.draw(context);
    context.restore();

    this.onrender();
  }
  /**
   * @param {Context Object} context
   */
  draw() {
    this.ondraw();
  }
  destory() {
    this.onshow =
      this.onhide =
      this.onupdate =
      this.onrender =
      this.ondraw =
        null;
    super.destory();
  }
}

DisplayObject.prototype.onshow = new Function();
DisplayObject.prototype.onhide = new Function();
DisplayObject.prototype.onupdate = new Function();
DisplayObject.prototype.onrender = new Function();
DisplayObject.prototype.ondraw = new Function();

export default DisplayObject;
