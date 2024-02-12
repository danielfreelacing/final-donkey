import Animation from "../../engine/component/Animation";
import Sprite from "../../engine/component/Sprite";
import ImageManager from "../../engine/utils/ImageManager";
import { getEffectFrames } from "../frames";

class Cloud extends Sprite {
  constructor() {
    super();
  }
  init() {
    const anim = new Animation({
      image: ImageManager.get("cloud"),
      frames: getEffectFrames("cloud"),
      loop: false,
    });
    this.anim = anim;

    anim.onend = function () {
      this.destory();
    };
    anim.init();
    anim.play();
    super.init();
  }
}

export default Cloud;
