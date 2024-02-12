import React from "react";
import DOM from "./engine/utils/DOM";
import ImageManager from "./engine/utils/ImageManager";
import Audio from "./libraries/classes/Audio";
import DonkeyJump from "./libraries/classes/DonkeyJump";
import KeyEvent from "./engine/event/KeyEvent";
import { getImageRes } from "./libraries/resources/images";
import { getAudioRes } from "./libraries/resources/audios";
import { buzz } from "./engine/utils/buzz";

function App() {
  const [imageResources, setImageResources] = React.useState(getImageRes());

  const loadImageResources = (number) => {
    DOM.get("progressText").innerHTML =
      "Loading...(" + ~~((number / imageResources.length) * 100) + "%)";
    if (number < imageResources.length) {
      return false;
    }

    if (!buzz.isOGGSupported() && !buzz.isMP3Supported()) {
      DOM.remove(DOM.get("progressText"));
      init();
    } else {
      loadAudioResources();
    }
  };

  const loadAudioResources = () => {
    const res = getAudioRes();
    const len = res.length;
    const group = [];
    console.log("len", len);

    for (let i = 0; i < len; i++) {
      const item = res[i];
      const a = new buzz.sound(item.src, {
        formats: ["wav", "mp3"],
        preload: true,
        autoload: true,
        loop: !!item.loop,
      });

      group.push(a);
      Audio.list[item.id] = a;
    }

    const buzzGroup = new buzz.group(group);
    let number = 1;

    buzzGroup.bind("loadeddata", function (e) {
      if (DOM.get("progressText")) {
        DOM.get("progressText").innerHTML =
          "Loading...(" + ~~((number / len) * 100) + "%)";
      }
      if (number >= len) {
        if (DOM.get("progressText")) {
          DOM.remove(DOM.get("progressText"));
        }
        init();
      } else {
        number++;
      }
    });
  };

  const init = () => {
    // Audio.play("ogg_background");

    const donkeyJump = new DonkeyJump();
    donkeyJump.setFPS(60);
    donkeyJump.init();
    const ui = donkeyJump.ui;

    donkeyJump.onstart = function () {
      KeyEvent.addListener();
    };
    donkeyJump.onupdate = function () {
      if (KeyEvent.check("VK_LEFT") || KeyEvent.check("A")) {
        donkeyJump.keyDownLeft = true;
      } else {
        donkeyJump.keyDownLeft = false;
      }

      if (KeyEvent.check("VK_RIGHT") || KeyEvent.check("D")) {
        donkeyJump.keyDownRight = true;
      } else {
        donkeyJump.keyDownRight = false;
      }
    };
    donkeyJump.onstop = function () {
      KeyEvent.removeListener();
    };
    ui.onplay = function () {
      this.toBody();
      donkeyJump.stateInit();
      donkeyJump.start();
    };
    ui.onsoundopen = function () {
      Audio.mute = false;
      Audio.play("ogg_background", true);
    };
    ui.onsoundclose = function () {
      Audio.mute = true;
      Audio.pauseAll();
    };
    ui.onpause = function () {
      donkeyJump.pause();
      ui.panelResumeVisible(true);
      ui.btnPauseVisible(false);
    };
    ui.onresumeexit = function () {
      ui.toCover();
      ui.panelResumeVisible(false);
      Audio.play("ogg_background");
    };
    ui.onresume = function () {
      ui.panelResumeVisible(false);
      ui.btnPauseVisible(true);
      donkeyJump.start();
      Audio.play("ogg_background", true);
    };
    ui.onshowcup =
      ui.onshowcore =
      ui.onshowmore =
      ui.onshare =
        function () {
          alert("Will be soon");
        };
  };

  React.useEffect(() => {
    window.addEventListener("load", () => {
      ImageManager.load(imageResources, loadImageResources);
    });
  }, []);
  return (
    <div id="donkeyJump">
      <div id="gameCover" className="block background">
        <a id="btnPlay" className="icon">
          &nbsp;
        </a>
        <span id="progressText"></span>
      </div>
      <div id="gameBody" className="block">
        <div id="gameCanvas" className="block">
          <canvas width="480" height="800" id="canvasSkyLayer"></canvas>
          <canvas width="480" height="800" id="canvasHillLayer"></canvas>
          <canvas width="480" height="800" id="canvasHillNearLayer"></canvas>
          <canvas width="480" height="800" id="canvasFloorLayer"></canvas>
          <canvas width="480" height="800" id="canvasStairLayer"></canvas>
          <canvas width="480" height="800" id="canvasDonkeyLayer"></canvas>
          <canvas width="480" height="800" id="canvasEffectLayer"></canvas>
        </div>
        <div id="numberAndPause" className="block">
          <div id="number" className="icon"></div>
          <a id="btnPause" className="icon">
            &nbsp;
          </a>
        </div>
        <div id="beingReady" className="icon">
          &nbsp;
        </div>
        <div id="beingGo" className="icon">
          &nbsp;
        </div>
        <div id="panelResume" className="icon">
          <a id="btnResumeExit">&nbsp;</a>
          <a id="btnResume">&nbsp;</a>
        </div>
      </div>
      <div id="gameOver" className="block background">
        <span id="name"></span>
        <span id="score"></span>
        <a id="btnRetry" className="icon">
          &nbsp;
        </a>
      </div>
    </div>
  );
}

export default App;
