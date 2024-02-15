import DOM from "../../engine/utils/DOM";

class UI {
  constructor() {
    this.gameCover = DOM.get("gameCover");
    this.gameBody = DOM.get("gameBody");
    this.gameOver = DOM.get("gameOver");
    this.number = DOM.get("number");
    this.life = DOM.get("life");
  }

  __initBtnPlay() {
    const btnPlay = DOM.get("btnPlay");
    btnPlay.onclick = () => this.onplay();
  }

  __initBtnPause() {
    const btnPause = DOM.get("btnPause");
    btnPause.onclick = () => this.onpause();
  }

  __initBtnResumeExit() {
    const btnResumeExit = DOM.get("btnResumeExit");
    btnResumeExit.onclick = () => this.onresumeexit();
  }

  __initBtnResume() {
    const btnResume = DOM.get("btnResume");
    btnResume.onclick = () => this.onresume();
  }

  __initBtnRetry() {
    const btnRetry = DOM.get("btnRetry");
    btnRetry.onclick = () => this.onretry();
  }
  init() {
    this.__initBtnPlay();
    this.__initBtnPause();
    this.__initBtnResumeExit();
    this.__initBtnRetry();
  }

  setNumber(number) {
    const numberChar = number.toString().split("");
    for (let i = 0; i < numberChar.length; i++) {
      numberChar[i] = '<span class="number' + numberChar[i] + '"></span>';
    }
    this.number.innerHTML = numberChar.join("");
  }

  setLife(life) {
    this.life.innerHTML = `<span class="number${life}" ></span>`;
  }

  btnPauseVisible(state) {
    if (state) {
      DOM.show(DOM.get("btnPause"));
    } else {
      DOM.hide(DOM.get("btnPause"));
    }
  }

  panelResumeVisible(state) {
    if (state) {
      DOM.show(DOM.get("panelResume"));
    } else {
      DOM.hide(DOM.get("panelResume"));
    }
  }

  beingReadyVisible(state) {
    if (state) {
      DOM.show(DOM.get("beingReady"));
    } else {
      DOM.hide(DOM.get("beingReady"));
    }
  }

  beingGoVisible(state) {
    if (state) {
      DOM.show(DOM.get("beingGo"));
    } else {
      DOM.hide(DOM.get("beingGo"));
    }
  }

  updateResult(name, score) {
    DOM.get("name").innerHTML = name || "Score:";
    DOM.get("score").innerHTML = score || 0;
  }

  toCover() {
    DOM.hide(this.gameBody);
    DOM.hide(this.gameOver);
    DOM.show(this.gameCover);
  }

  toBody() {
    DOM.hide(this.gameOver);
    DOM.hide(this.gameCover);
    DOM.show(this.gameBody);
  }

  toOver() {
    DOM.hide(this.gameCover);
    DOM.hide(this.gameBody);
    DOM.show(this.gameOver);
  }
}

export default UI;
