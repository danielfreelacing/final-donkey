class UI {
    constructor() {
        this.gameCover = my.DOM.get('gameCover');
        this.gameBody = my.DOM.get('gameBody');
        this.gameOver = my.DOM.get('gameOver');
        this.number = my.DOM.get('number');
    }

    __initBtnPlay() {
        var btnPlay = my.DOM.get('btnPlay'), self = this;
        btnPlay.onclick = function () {
            self.onplay();
        };
    }

    __initBtnPause() {
        var btnPause = my.DOM.get('btnPause'), self = this;
        btnPause.onclick = function () {
            self.onpause();
        };
    }
    
    __initBtnResumeExit() {
        var btnResumeExit = my.DOM.get('btnResumeExit'), self = this;
        btnResumeExit.onclick = function () {
            self.onresumeexit();
        };
    }
    
    __initBtnResume() {
        var btnResume = my.DOM.get('btnResume'), self = this;
        btnResume.onclick = function () {
            self.onresume();
        };
    }
    
    __initBtnRetry() {
        var btnRetry = my.DOM.get('btnRetry'), self = this;
        btnRetry.onclick = function () {
            self.onretry();
        };
    }
    init() {
        this.__initBtnPlay();
        this.__initBtnPause();
        this.__initBtnResumeExit();
        this.__initBtnRetry();
    }
    
    setNumber(number) {
        var numberChar = number.toString().split('');
        for (var i = 0; i < numberChar.length; i++) {
            numberChar[i] = '<span class="number' + numberChar[i] + '"></span>';
        }
        this.number.innerHTML = numberChar.join('');
    }
    
    btnPauseVisible(state) {
        if (state) {
            my.DOM.show(my.DOM.get('btnPause'));
        } else {
            my.DOM.hide(my.DOM.get('btnPause'));
        }
    }
    
    panelResumeVisible(state) {
        if (state) {
            my.DOM.show(my.DOM.get('panelResume'));
        } else {
            my.DOM.hide(my.DOM.get('panelResume'));
        }
    }
    
    beingReadyVisible(state) {
        if (state) {
            my.DOM.show(my.DOM.get('beingReady'));
        } else {
            my.DOM.hide(my.DOM.get('beingReady'));
        }
    }
    
    beingGoVisible(state) {
        if (state) {
            my.DOM.show(my.DOM.get('beingGo'));
        } else {
            my.DOM.hide(my.DOM.get('beingGo'));
        }
    }
    
    updateResult(name, score) {
        my.DOM.get('name').innerHTML = name || 'Tap here to';
        my.DOM.get('score').innerHTML = score || 0;
    }
    
    toCover() {
        my.DOM.hide(this.gameBody);
        my.DOM.hide(this.gameOver);
        my.DOM.show(this.gameCover);
    }
    
    toBody() {
        my.DOM.hide(this.gameOver);
        my.DOM.hide(this.gameCover);
        my.DOM.show(this.gameBody);
    }
    
    toOver() {
        my.DOM.hide(this.gameCover);
        my.DOM.hide(this.gameBody);
        my.DOM.show(this.gameOver);
    }
}