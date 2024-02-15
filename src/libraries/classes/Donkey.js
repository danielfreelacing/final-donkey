import Sprite from "../../engine/component/Sprite";
import Animation from "../../engine/component/Animation";
import ImageManager from "../../engine/utils/ImageManager";
import { getDonkeyFrames } from "../frames";
import Root from "../../engine/core/Root";
import Audio from "./Audio";

class Donkey extends Sprite {
  constructor() {
    super();
    this.game = null;

    /**
     * @format left|front|right
     */
    this.direction = "";

    this.animName = "";

    /**
     * @private
     */
    // this.__superJumpHeight = 0;
    this.minTop = 0;
    this.stateUpdate = Root.fn;
    this.deadHeight = 1000;
    this.deadViewportFixed = false;
    this.inertia = 0;
  }
  /**
   * @private
   */
  __borderCheck() {
    if (this.direction === "left" && this.x < -64) {
      this.x = 416;
    } else if (this.direction === "right" && this.x > 416) {
      this.x = -64;
    }
  }
  /**
   * @private
   */
  __stateReady(deltaTime) {
    const game = this.game;
    // if (game.ready(deltaTime)) {
    //   this.stateUpdate = this.jump;
    //   return false;
    // }

    if (game.keyDownLeft) {
      if (this.direction !== "left") {
        this.setAnim("run");
        this.flipX = true;
        this.speedX = -0.2;
        this.direction = "left";
      }
      this.__borderCheck();
      this.parent.change();
    } else if (game.keyDownRight) {
      if (this.direction !== "right") {
        this.setAnim("run");
        this.flipX = false;
        this.speedX = 0.2;
        this.direction = "right";
      }
      this.__borderCheck();
      this.parent.change();
    } else if (game.keyDownUp) {
      if (this.direction !== "up") {
        this.flipX = true;
        this.direction = "up";
        this.jump();
      }
    } else {
      if (this.direction !== "front") {
        this.flipX = false;
        this.speedX = 0;
        this.direction = "front";
        this.stop()
      }
    }
  }
  /**
   * @private
   */
  __stop() {
    const game = this.game;
    if (this.animName !== "daiji") {
      this.setAnim("daiji");
      this.width = 128;
      this.height = 128;
      this.speedX = 0;
      this.speedY = 0;
      this.acceX = 0;
      this.acceY = 0;
      this.direction = "front";
      this.y = this.game.viewport.y + 800 - this.height;
      this.flipX = false;
    }
    this.__keyControl(true);

    this.parent.change();
    game.viewportMove();
  }
  stop() {
    this.animName = "";
    this.stateUpdate = this.__stop;
  }

  __jump() {
    const game = this.game;
    if (this.animName !== "jump") {
      Audio.play("ogg_jump");
      this.setAnim("jump");
      this.speedY = -1;
      this.acceY = 1 / 600;
      this.width = 128;
      this.height = 128;
    }
    this.__keyControl(true);

    this.parent.change();
    game.viewportMove();
  }
  jump() {
    if (this.speedY !== -1) {
      this.animName = "";
      this.stateUpdate = this.__jump;
    }
  }
  dead() {
    Audio.pause("ogg_background");
    Audio.play("ogg_die");
    this.stateUpdate = this.__dead;
    this.setAnim("dead");
    this.speedX = 0;
    this.speedY = 0.0;
    this.acceX = 0;
    this.acceY = 1 / 1000;
    this.flipX = false;
  }
  /**
   * @private
   */
  __dead() {
    const game = this.game;

    if (this.deadHeight > 0) {
      const diffY = this.y - this.lastY;
      const viewport = game.viewport;

      if (this.deadViewportFixed) {
        //
      } else if (this.y >= viewport.y + 400) {
        // viewport.move(0, diffY * 2);
        game.layerChnage();
      } else {
        this.deadViewportFixed = true;
      }

      this.deadHeight -= diffY;
      this.parent.change();
    } else {
      game.gameover();
    }
  }
  /**
   * @private
   * @param {Boolean} flipX
   */
  __keyControl(flipX) {
    const game = this.game;

    if (game.keyDownLeft) {
      if (this.direction !== "left") {
        this.flipX = false;
        this.direction = "left";
      }
      this.speedX = -0.2;
      this.inertia = this.speedX;
      this.__borderCheck();
    } else if (game.keyDownRight) {
      if (this.direction !== "right") {
        this.flipX = !!flipX;
        this.direction = "right";
      }
      this.speedX = 0.2;
      this.inertia = this.speedX;
      this.__borderCheck();
    } else if (game.keyDownUp) {
      if (this.direction !== "up") {
        this.flipX = true;
        this.direction = "up";
        this.jump();
      }
    } else {
      if (this.inertia < 0) {
        this.inertia += 0.005;
      } else if (this.inertia > 0) {
        this.inertia -= 0.005;
      }
      this.speedX = this.inertia;
    }
  }
  init() {
    this.reset();
    super.init();
  }
  reset() {
    this.width = 128;
    this.height = 128;
    this.flipX = false;
    this.speedX = 0;
    this.speedY = 0;
    this.acceX = 0;
    this.acceY = 0;
    this.direction = "";
    this.setAnim("daiji");
    this.stateUpdate = this.__stateReady;
    // this.__superJumpHeight = 0;
    this.deadHeight = 1000;
    this.deadViewportFixed = false;
  }
  /**
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    super.update(deltaTime);
    this.stateUpdate(deltaTime);
  }
  /**
   * @param {String} animName
   * @param {Boolean} donplay
   */
  setAnim(animName, donplay) {
    this.animName = animName;

    const anim = new Animation({
      image: ImageManager.get(animName),
      frames: getDonkeyFrames(animName),
    });

    const notLoopAnims = ["daiji", "jump"];
    const len = notLoopAnims.length;
    for (let i = 0; i < len; i++) {
      if (notLoopAnims[i] === animName) {
        anim.loop = false;
        break;
      }
    }

    anim.init();
    if (!donplay) {
      anim.play();
    }
    this.anim = anim;
  }
}

export default Donkey;
