import Component from "./Component";

class Animation extends Component {
  constructor() {
    super();
    this.image = null;
    /**
     * @format {
     *     x: 0,
     *     y: 0,
     *     duration: 0,
     *     collRect: [[left, top, width, height]]
     * }
     */
    this.frames = [];
    this.loop = true;
    this.speed = 1;
    /**
     * @read only
     */
    this.playing = false;
    /**
     * @read only
     */
    this.currentFrameIndex = 0;
    /**
     * @read only
     */
    this.currentFrame = null;
    /**
     * @private
     */
    this.__framePlayedDuration = 0;
  }
  /**
   * @private
   * @param {Number} index
   */
  __gotoFrame(index) {
    if (this.frames[index]) {
      this.currentFrameIndex = index;
      this.currentFrame = this.frames[index];
      this.__framePlayedDuration = 0;
    }
  }
  /**
   * @private
   */
  __nextFrame() {
    if (this.currentFrameIndex < this.frames.length - 1) {
      this.__gotoFrame(this.currentFrameIndex + 1);
    } else if (this.loop) {
      this.__gotoFrame(0);
    } else {
      this.stop();
      this.onend();
    }
  }
  init() {
    this.__gotoFrame(0);
    super.init();
  }
  play() {
    this.playing = true;
    this.onplay();
  }
  stop() {
    this.playing = false;
    this.onstop();
  }
  /**
   * @param {Number} index
   */
  gotoAndPlay(index) {
    this.__gotoFrame(index);
    this.play();
  }
  /**
   * @param {Number} index
   */
  gotoAndStop(index) {
    this.__gotoFrame(index);
    this.stop();
  }
  /**
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    if (!this.playing) {
    } else if (this.__framePlayedDuration >= this.currentFrame.duration) {
      this.__nextFrame();
    } else {
      this.__framePlayedDuration += deltaTime * this.speed;
    }
  }
  destory() {
    this.image =
      this.frames =
      this.currentFrame =
      this.onplay =
      this.onstop =
      this.onend =
        null;
    super.destory();
  }
}

Animation.prototype.onplay = new Function();
Animation.prototype.onstop = new Function();
Animation.prototype.onend = new Function();

export default Animation;
