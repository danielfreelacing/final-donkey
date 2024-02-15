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
    Root.extend(this, cfg);
  }
  init() {
    this.width = 256;
    this.height = 128;
    this.x = random(10, 313);

    const stairTypes = [
      "stair_stable_01",
      "stair_stable_02",
      "stair_stable_03",
      "stair_stable_04",
      "stair_stable_05",
    ];
    const name = stairTypes[random(0, 4)];
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
    this.speedY = 0.1;
    super.update(deltaTime);
  }
}

export default Stair;
