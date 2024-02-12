class Audio {
  constructor() {
    this.mute = false;
    /**
     * buzz group
     */
    this.buzzGroup = null;
    this.list = {};
  }
  play(id, resumePlay) {
    if (this.list[id] && !this.mute) {
      if (!resumePlay) {
        this.list[id].setTime(0);
      }
      this.list[id].play();
    }
  }
  /**
   * @param {Number} id
   */
  pause(id) {
    this.list[id].pause();
  }
  pauseAll() {
    buzz.all().pause();
  }
}

export default Audio;
