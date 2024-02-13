import Sprite from "../../engine/component/Sprite";
import Animation from "../../engine/component/Animation";
import ImageManager from "../../engine/utils/ImageManager";
import Root from "../../engine/core/Root";
import { random } from "../../engine/utils/Math";
import { getStairFrames } from "../frames";

class Stair extends Sprite {
  constructor(cfg) {
    super();
    this.name = "";
    this.prop = null;
    Root.extend(this, cfg);
  }
  init() {
    this.width = 256;
    this.height = 128;
    this.x = random(10, 313);

    const stairTypes = [
      // "stair_friable",
      "stair_moveable",
      "stair_stable_01",
      "stair_stable_02",
      "stair_stable_03",
      "stair_stable_04",
      "stair_stable_05",
    ];
    const name = stairTypes[random(0, 5)];

    if (name === "stair_moveable") {
      this.speedX = random(10, 20) / 100;
      if (random(0, 1)) {
        this.speedX = -this.speedX;
      }
    }

    this.update = this.__moveableUpdate;

    const anim = new Animation({
      image: ImageManager.get(name),
      frames: getStairFrames(name),
      loop: false,
    });
    anim.init();

    this.name = name;
    this.anim = anim;
    super.init();
  }
  /**
   * @private
   */
  __moveableUpdate(deltaTime) {
    console.log("moveupdate1");
    if (this.name === "stair_moveable") {
      if (
        (this.x < 0 && this.speedX < 0) ||
        (this.x > 322 && this.speedX > 0)
      ) {
        this.speedX = -this.speedX;
      }

      if (this.prop && this.lastX !== 0) {
        this.prop.x += this.x - this.lastX;
      }
    }

    this.speedY = 0.03;
    super.update(deltaTime);
  }
}

export default Stair;
