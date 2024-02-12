import React from "react";

function App() {
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
