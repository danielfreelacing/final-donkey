import Sprite from "../../engine/component/Sprite";
import Animation from "../../engine/component/Animation";
import ImageManager from "../../engine/utils/ImageManager";
import { getDonkeyFrames } from "../frames";

class Donkey extends Sprite {
  constructor() {
    super();
    this.game = null;

    /**
     * @format left|front|right
     */
    this.direction = "front";

    this.animName = "";

    /**
     * @private
     */
    this.__superJumpHeight = 0;

    /**
     * @private
     */
    this.__MJHeight = 0;

    /**
     * @private
     */
    this.__glidingHeight = 0;

    /**
     * @private
     */
    this.__UFOHeight = 0;

    /**
     * @private
     */
    this.__balloonHeight = 0;
    this.minTop = 0;
    this.stateUpdate = my.fn;
    this.deadHeight = 1000;
    this.deadViewportFixed = false;
    this.inertia = 0;
  }
  /**
   * @private
   */
  __borderCheck() {
    if (this.direction == "left" && this.x < -64) {
      this.x = 416;
    } else if (this.direction == "right" && this.x > 416) {
      this.x = -64;
    }
  }
  /**
   * @private
   */
  __stateReady(deltaTime) {
    const game = this.game;
    if (game.ready(deltaTime)) {
      this.stateUpdate = this.superJump;
      return false;
    }

    if (game.keyDownLeft) {
      if (this.direction != "left") {
        this.setAnim("run");
        this.flipX = true;
        this.speedX = -0.2;
        this.direction = "left";
      }
      this.__borderCheck();
      this.parent.change();
    } else if (game.keyDownRight) {
      if (this.direction != "right") {
        this.setAnim("run");
        this.flipX = false;
        this.speedX = 0.2;
        this.direction = "right";
      }
      this.__borderCheck();
      this.parent.change();
    } else {
      if (this.direction != "front") {
        this.setAnim("daiji");
        this.flipX = false;
        this.speedX = 0;
        this.direction = "front";
        this.parent.change();
      }
    }
  }
  superJump() {
    const game = this.game;

    if (this.__superJumpHeight > 1200) {
      this.__superJumpHeight = 0;
      this.stateUpdate = this.__jump;
      return false;
    } else {
      this.__superJumpHeight += this.lastY - this.y;
    }

    if (this.animName != "superjump") {
      Audio.play("ogg_super");
      this.setAnim("superjump");
      this.speedY = -0.8;
      this.acceY = 0;
    }
    this.__keyControl(true);

    this.parent.change();
    game.viewportMove();
  }
  /**
   * @private
   */
  __jump() {
    const game = this.game;

    if (this.animName != "jump") {
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
    if (this.speedY != -1) {
      this.animName = "";
      this.__jump();
    }
  }
  /**
   * MJ
   */
  MJ() {
    const game = this.game;

    if (this.__MJHeight > 1200) {
      this.__MJHeight = 0;
      this.stateUpdate = this.__jump;
      return false;
    } else {
      this.__MJHeight += this.lastY - this.y;
    }

    if (this.animName != "MJ") {
      this.setAnim("MJ");
      this.speedY = -0.5;
      this.acceY = 0;
      this.flipX = false;
    }
    this.__keyControl();

    this.parent.change();
    game.viewportMove();
  }
  gliding() {
    const game = this.game;

    if (this.__glidingHeight > 1200) {
      this.__glidingHeight = 0;
      this.stateUpdate = this.__jump;
      return false;
    } else {
      this.__glidingHeight += this.lastY - this.y;
    }

    if (this.animName != "plan") {
      this.setAnim("plan");
      this.speedY = -0.5;
      this.acceY = 0;
      this.flipX = false;
      this.width = 256;
      this.height = 256;
    }
    this.__keyControl();

    this.parent.change();
    game.viewportMove();
  }
  /**
   * UFO
   */
  UFO() {
    const game = this.game;

    if (this.__UFOHeight > 1200) {
      this.__UFOHeight = 0;
      this.stateUpdate = this.__jump;
      return false;
    } else {
      this.__UFOHeight += this.lastY - this.y;
    }

    if (this.animName != "UFO") {
      this.setAnim("UFO");
      this.speedY = -0.5;
      this.acceY = 0;
      this.flipX = false;
      this.width = 256;
      this.height = 512;
    }
    this.__keyControl();

    this.parent.change();
    game.viewportMove();
  }
  balloon() {
    const game = this.game;

    if (this.__balloonHeight > 1200) {
      this.__balloonHeight = 0;
      this.stateUpdate = this.__jump;
      return false;
    } else {
      this.__balloonHeight += this.lastY - this.y;
    }

    if (this.animName != "qiqiu") {
      this.setAnim("qiqiu");
      this.speedY = -0.5;
      this.acceY = 0;
      this.flipX = false;
      this.width = 128;
      this.height = 128;
    }
    this.__keyControl();

    this.parent.change();
    game.viewportMove();
  }
  dead() {
    Audio.pause("ogg_background");
    Audio.play("ogg_die");
    this.stateUpdate = this.__dead;
    this.setAnim("dead");
    this.speedX = 0;
    this.speedY = 0.15;
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
        viewport.move(0, diffY * 2);
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
      if (this.direction != "left") {
        this.flipX = !!flipX;
        this.direction = "left";
      }
      this.speedX = -0.25;
      this.inertia = this.speedX;
      this.__borderCheck();
    } else if (game.keyDownRight) {
      if (this.direction != "right") {
        this.flipX = false;
        this.direction = "right";
      }
      this.speedX = 0.25;
      this.inertia = this.speedX;
      this.__borderCheck();
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
    this.direction = "front";
    this.setAnim("daiji");
    this.stateUpdate = this.__stateReady;
    this.__superJumpHeight = 0;
    this.__MJHeight = 0;
    this.__glidingHeight = 0;
    this.__UFOHeight = 0;
    this.__balloonHeight = 0;
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
      if (notLoopAnims[i] == animName) {
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
