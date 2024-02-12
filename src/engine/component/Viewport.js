import Component from "./Component";

class Viewport extends Component {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    /**
     * @private
     */
    this.__lastX = 0;
    /**
     * @private
     */
    this.__lastY = 0;
  }
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Boolean} absolute
   */
  move(x, y, absolute) {
    this.__lastX = this.x;
    this.__lastY = this.y;

    if (absolute) {
      this.x = x;
      this.y = y;
    } else {
      this.x += x;
      this.y += y;
    }
  }
}

export default Viewport;
