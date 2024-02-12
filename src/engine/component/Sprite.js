import DisplayObject from "./DisplayObject";
import Root from "../core/Root";

class Sprite extends DisplayObject {
  constructor(cfg) {
    super();

    this.anim = null;
    this.speedX = 0;
    this.speedY = 0;
    this.acceX = 0;
    this.acceY = 0;
    /**
     * read only
     */
    this.lastX = 0;
    /**
     * read only
     */
    this.lastY = 0;
    /**
     * read only
     */
    this.lastSpeedX = 0;
    /**
     * read only
     */
    this.lastSpeedY = 0;
    Root.extend(this, cfg);
  }
  /**
   * @private
   */
  __getCollRect() {
    if (this.anim && this.anim.currentFrame) {
      return this.anim.currentFrame.collRect;
    }
  }
  /**
   * @param {Sprite Object} sprite2
   */
  hitTest(sprite2) {
    let collRect1 = this.__getCollRect();
    let collRect2 = sprite2.__getCollRect();
    let result = false;
    let coll1, coll2;

    if (collRect1 && collRect2) {
      const len1 = collRect1.length;
      const len2 = collRect2.length;

      for (let i1 = 0; i1 < len1; i1++) {
        coll1 = collRect1[i1];

        for (let i2 = 0; i2 < len2; i2++) {
          coll2 = collRect2[i2];

          if (
            Math.abs(
              this.x +
                coll1[0] +
                coll1[2] / 2 -
                (sprite2.x + coll2[0] + coll2[2] / 2)
            ) <
              (coll1[2] + coll2[2]) / 2 &&
            Math.abs(
              this.y +
                coll1[1] +
                coll1[3] / 2 -
                (sprite2.y + coll2[1] + coll2[3] / 2)
            ) <
              (coll1[3] + coll2[3]) / 2
          ) {
            result = true;
            break;
          }
        }
      }
    }
    sprite2 = collRect1 = collRect2 = coll1 = coll2 = null;
    return result;
  }
  /**
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.lastSpeedX = this.speedX;
    this.lastSpeedY = this.speedY;
    this.lastX = this.x;
    this.lastY = this.y;

    this.speedX = this.lastSpeedX + this.acceX * deltaTime;
    this.speedY = this.lastSpeedY + this.acceY * deltaTime;

    this.x += Math.round(((this.lastSpeedX + this.speedX) * deltaTime) / 2);
    this.y += Math.round(((this.lastSpeedY + this.speedY) * deltaTime) / 2);

    if (this.anim) {
      this.anim.update(deltaTime);
    }
    super.update(this);
  }
  /**
   * @param {Context Object} context
   */
  draw(context) {
    const anim = this.anim;
    if (anim && anim.currentFrame) {
      const frame = anim.currentFrame;
      context.drawImage(
        anim.image,
        frame.x,
        frame.y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
      super.draw();
    }
  }
  destory() {
    if (this.anim) {
      this.anim.destory();
      this.anim = null;
    }
    super.destory();
  }
}

export default Sprite;
