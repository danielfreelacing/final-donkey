import Game from "../../engine/component/Game";
import Viewport from "../../engine/component/Viewport";
import Layer from "../../engine/component/Layer";
import Bitmap from "../../engine/component/Bitmap";
import ImageManager from "../../engine/utils/ImageManager";
import Donkey from "./Donkey";
import UI from "./UI";
import Audio from "./Audio";
import Stair from "./Stair";
import Cloud from "./Cloud";
import { random } from "../../engine/utils/Math";

class DonkeyJump extends Game {
  constructor() {
    super();
    this.viewport = null;
    this.skyLayer = null;
    this.hillLayer = null;
    this.hillNearLayer = null;
    this.floorLayer = null;
    this.stairLayer = null;
    this.donkeyLayer = null;
    this.effectLayer = null;
    this.donkey = null;
    this.viewportDefault = [0, 45440];
    this.score = 0;
    this.life = 3;
    this.ui = null;
    this.keyDownLeft = false;
    this.keyDownRight = false;
    this.keyDownUp = false;
    this.readyTime = 0;
    this.isGo = false;
    this.lastStairY = 0;
    this.decrease = false;
    this.stopDecrease = false;
  }
  /**
   * @private
   */
  __createLayers() {
    const viewport = new Viewport({
      width: 1440,
      height: 800,
    });

    const skyLayer = new Layer({
      viewport,
      distance: 20,
    });
    skyLayer.setCanvas("canvasSkyLayer");
    const hillLayer = new Layer({
      viewport,
      distance: 15,
    });
    hillLayer.setCanvas("canvasHillLayer");
    const hillNearLayer = new Layer({
      viewport,
      distance: 5,
    });
    hillNearLayer.setCanvas("canvasHillNearLayer");
    const floorLayer = new Layer({
      viewport,
    });
    floorLayer.setCanvas("canvasFloorLayer");
    const stairLayer = new Layer({
      viewport,
    });
    stairLayer.setCanvas("canvasStairLayer");
    const donkeyLayer = new Layer({
      viewport,
    });
    donkeyLayer.setCanvas("canvasDonkeyLayer");
    const effectLayer = new Layer({
      viewport,
    });
    effectLayer.setCanvas("canvasEffectLayer");

    this.appendChild(skyLayer);
    this.appendChild(hillLayer);
    this.appendChild(hillNearLayer);
    this.appendChild(floorLayer);
    this.appendChild(stairLayer);
    this.appendChild(donkeyLayer);
    this.appendChild(effectLayer);

    this.viewport = viewport;
    this.skyLayer = skyLayer;
    this.hillLayer = hillLayer;
    this.hillNearLayer = hillNearLayer;
    this.floorLayer = floorLayer;
    this.stairLayer = stairLayer;
    this.donkeyLayer = donkeyLayer;
    this.effectLayer = effectLayer;
  }
  /**
   * @private
   */
  __createDonkey() {
    const donkey = new Donkey();
    donkey.game = this;
    this.donkey = donkey;
    this.donkeyLayer.appendChild(donkey);
  }
  /**
   * @private
   */
  __createScene() {
    const sky = new Bitmap({
      image: ImageManager.get("sky"),
      width: 1440,
      height: 6144,
    });
    this.skyLayer.appendChild(sky);
    const hill = new Bitmap({
      image: ImageManager.get("hill"),
      width: 1440,
      height: 1206,
      y: this.viewportDefault[1] + (800 - 603) * this.hillLayer.distance,
    });
    this.hillLayer.appendChild(hill);
    const hillnear = new Bitmap({
      image: ImageManager.get("hillnear"),
      width: 1440,
      height: 1226,
      y: this.viewportDefault[1] + (800 - 613) * this.hillNearLayer.distance,
    });
    this.hillNearLayer.appendChild(hillnear);
    const floor = new Bitmap({
      image: ImageManager.get("floor"),
      width: 1440,
      height: 1168,
      y: this.viewportDefault[1] + (800 - 584) * this.floorLayer.distance,
    });
    this.floorLayer.appendChild(floor);
  }
  __createUI() {
    const ui = new UI();
    ui.init();

    ui.onretry = () => {
      Audio.play("ogg_background");

      ui.toBody();
      this.stateInit();
      this.start();
    };
    this.ui = ui;
  }
  init() {
    this.__createLayers();
    this.__createDonkey();
    this.__createScene();
    this.__createUI();

    super.init();
  }
  update(deltaTime) {
    this.stairLayer.change();
    this.__stairControl();
    super.update(deltaTime);
  }
  /**
   * @param {Number} score
   */
  setScore(score) {
    this.score = score;
    this.ui.setNumber(score);
  }
  setLife(life) {
    this.life = life;
    this.ui.setLife(life);
  }
  /**
   * @private
   */
  __createDefaultStair() {
    this.stairLayer.destoryChilds();
    this.lastStairY = this.viewportDefault[1] + 400;
    const stair = new Stair({
      y: this.lastStairY,
    });
    stair.init();
    this.stairLayer.appendChild(stair);
  }
  /**
   * @private
   */
  __stairControl() {
    let lastStairY = this.lastStairY;
    const space = random(50, 60);
    const childs = this.stairLayer.getChilds();
    const lenBefore = childs.length;

    for (let i = 0; i < lenBefore; i++) {
      const child = childs[i];
      if (child && child.y > this.viewport.y + 800) {
        child.destory();
        this.stopDecrease = false
        i--;
      }
    }

    if (childs[childs.length - 1]) {
      lastStairY = childs[childs.length - 1].y;
    }
    if (this.viewport.y < lastStairY) {
      this.lastStairY =
        lastStairY - (space + Math.max(~~(this.score / 500), 0));
      const stair = new Stair({
        y: this.lastStairY,
      });
      stair.init();
      this.stairLayer.appendChild(stair);
    }
  }
  layerChnage() {
    const y = this.viewport.y;

    this.skyLayer.change();
    if (y > 36300) {
      this.hillLayer.change();
    }
    if (y > 4230) {
      this.hillNearLayer.change();
    }
    if (y > 44800) {
      this.floorLayer.change();
    }
  }
  viewportMove() {
    const donkey = this.donkey;
    const viewport = this.viewport;
    const donkeyY = donkey.y;

    if (donkeyY < donkey.lastY) {
      if (donkeyY < donkey.minTop) {
        const stairLayer = this.stairLayer;
        const stairs = stairLayer.getChilds();
        const len = stairs.length;
        for (let i = 0; i < len; i++) {
          const stair = stairs[i];
          if (stair && donkey.hitTest(stair) && !this.decrease) {
            this.life = this.life - 1;
            this.setLife(this.life);
            if (this.life < 1) {
              donkey.dead();
            }

            this.decrease = true;
            break;
          }
        }
        if (!this.decrease) {
          if (donkeyY < 45776) {
            viewport.move(0, donkeyY - 336, true);
          }
          this.setScore(45970 - donkeyY);
          this.layerChnage();
          donkey.minTop = donkeyY;
        }
      }
    } else if (donkey.animName === "jump") {
      this.decrease = false;
      if (donkey.y + donkey.height > viewport.y + 800) {
        donkey.stop();
      } else {
        const stairLayer = this.stairLayer;
        const stairs = stairLayer.getChilds();

        const len = stairs.length;
        for (let i = 0; i < len; i++) {
          const stair = stairs[i];
          if (stair && donkey.hitTest(stair)) {
            const cloud = new Cloud({
              x: donkey.x + (donkey.direction === "left" ? 45 : 35),
              y: stair.y - 16,
              width: 64,
              height: 16,
            });

            cloud.onupdate = cloud.ondestory = () => {
              this.effectLayer.change();
            };
            this.effectLayer.appendChild(cloud);
            cloud.init();

            donkey.width = 128;
            donkey.height = 128;
            donkey.speedX = 0;
            donkey.acceX = 0;
            // donkey.acceY = 0;
            donkey.direction = "front";
            donkey.speedY = 0;
          }
        }
      }
    } else {
      if (donkey.animName === "daiji") {
        const stairLayer = this.stairLayer;
        const stairs = stairLayer.getChilds();
        const len = stairs.length;
        for (let i = 0; i < len; i++) {
          const stair = stairs[i];
          if (stair && donkey.hitTest(stair) && !this.stopDecrease) {
            this.life = this.life - 1;
            this.setLife(this.life);
            if (this.life < 1) {
              donkey.dead();
            }
            this.stopDecrease = true;
            break;
          }
        }
      }
    }
  }
  /**
   * @return {Boolean}
   */
  ready(deltaTime) {
    let go = false;

    if (deltaTime <= 0) {
      return false;
    }

    if (this.readyTime === 0) {
      this.ui.beingReadyVisible(true);
      Audio.play("ogg_321");
    } else if (this.readyTime > 3000) {
      this.ui.beingGoVisible(false);
      go = true;
      Audio.play("ogg_go");
      this.ui.btnPauseVisible(true);
    } else if (this.readyTime > 2000) {
      if (!this.isGo) {
        this.ui.beingReadyVisible(false);
        this.ui.beingGoVisible(true);
        this.isGo = true;
        Audio.play("ogg_321");
      }
    } else if (this.readyTime > 1000) {
      if (this.readyTime + deltaTime > 2000) {
        Audio.play("ogg_321");
      }
    } else {
      if (this.readyTime + deltaTime > 1000) {
        Audio.play("ogg_321");
      }
    }
    this.readyTime += deltaTime;

    return go;
  }
  stateInit() {
    this.viewport.move(this.viewportDefault[0], this.viewportDefault[1], true);
    this.donkey.x = 176;
    this.donkey.y = this.viewportDefault[1] + 800 - this.donkey.height;
    this.donkey.minTop = this.donkey.y;
    this.donkey.reset();
    this.readyTime = 0;
    this.isGo = false;
    this.setScore(0);
    this.setLife(3);
    this.__createDefaultStair();
    this.skyLayer.change();
    this.hillLayer.change();
    this.hillNearLayer.change();
    this.floorLayer.change();
    this.stairLayer.change();
    this.effectLayer.change();
    this.donkeyLayer.change();
    // UI
    this.ui.btnPauseVisible(false);
  }
  pause() {
    this.stop();
    Audio.pauseAll();
  }
  gameover() {
    const ui = this.ui;

    this.stop();
    ui.updateResult(null, this.score);
    ui.toOver();
  }
}

export default DonkeyJump;
