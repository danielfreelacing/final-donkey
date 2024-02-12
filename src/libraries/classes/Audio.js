import { buzz } from "../../engine/utils/buzz";

const Audio = {
  mute: false,
  /**
   * buzz group
   */
  buzzGroup: null,
  list: {},
  play: (id, resumePlay) => {
    if (Audio.list[id] && !Audio.mute) {
      if (!resumePlay) {
        Audio.list[id].setTime(0);
      }
      Audio.list[id].play();
    }
  },
  /**
   * @param {Number} id
   */
  pause: (id) => {
    Audio.list[id].pause();
  },
  pauseAll: () => {
    buzz.all().pause();
  },
};

export default Audio;
