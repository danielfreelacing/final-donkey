import DisplayObjectContainer from "./DisplayObjectContainer";

class Game extends DisplayObjectContainer {
  constructor() {
    super();
    this.viewport = null;
    /**
     * read only
     */
    this.FPS = 30;
    /**
     * 运行状态
     */
    this.playing = false;
    /**
     * @private
     */
    this.__sleep = 1000 / this.FPS;
    /**
     * @private
     */
    this.__lastTime = 0;
    /**
     * @private
     */
    this.__timeout = null;
  }
  /**
   * @param {Number} fps
   */
  setFPS(fps) {
    this.FPS = fps;
    this.__sleep = 1000 / fps;
  }
  start() {
    if (!this.playing) {
      this.playing = true;
      this.__lastTime = new Date().getTime();
      this.__run();
      this.onstart();
    }
  }
  stop() {
    if (this.playing) {
      this.playing = false;
      clearTimeout(this.__timeout);
      this.onstop();
    }
  }
  render() {
    const childs = this.__childs;
    const len = childs.length;

    for (let i = 0; i < len; i++) {
      childs[i].render();
    }
    this.onrender();
  }
  clear() {
    const childs = this.__childs;
    const len = childs.length;

    for (let i = 0; i < len; i++) {
      childs[i].clear();
    }
  }
  /**
   * @private
   */
  __run() {
    const now = new Date().getTime();
    this.__timeout = setTimeout(my.delegate(this.__run, this), this.__sleep);
    this.update(now - this.__lastTime);
    this.clear();
    this.render();
    this.__lastTime = now;
  }
  /**
   * destory
   */
  destory() {
    this.stop();
    super.destory();
  }
}

export default Game;
