class KeyEvent {
  constructor() {}
  static addListener() {
    document.onkeydown = function (e) {
      var e = e || event,
        code = e.keyCode || e.which;
      KeyEvent.__keyDownMap[code] = true;
    };

    document.onkeyup = function (e) {
      var e = e || event,
        code = e.keyCode || e.which;
      KeyEvent.__keyDownMap[code] = false;
    };
  }
  static removeListener() {
    document.onkeydown = null;
    document.onkeyup = null;
  }
  /**
   * @param {String} key
   */
  static check(key) {
    var code = KeyEvent.__keyCodeMap[key];
    return !!KeyEvent.__keyDownMap[code];
  }
}

KeyEvent.__keyCodeMap = {
  VK_ESCAPE: 27, // ESC
  VK_RETURN: 13, //
  VK_TAB: 9, // TAB
  VK_CAPITAL: 20, // Caps Lock
  VK_SHIFT: 16, // Shift
  VK_CONTROL: 17, // Ctrl
  VK_MENU: 18, // Alt
  VK_SPACE: 32, // Space
  VK_BACK: 8, // Backspace
  VK_LWIN: 91, // Left win
  VK_RWIN: 92, // Right win
  K_APPS: 93, //

  VK_INSERT: 45, // Insert
  VK_HOME: 36, // Home
  VK_PRIOR: 33, // Page Up
  VK_NEXT: 34, // Page Down
  VK_END: 35, // End
  VK_DELETE: 46, // Delete
  VK_LEFT: 37, // (←)
  VK_UP: 38, // (↑)
  VK_RIGHT: 39, // (→)
  VK_DOWN: 40, // (↓)

  VK_F1: 112, // F1
  VK_F2: 113, // F2
  VK_F3: 114, // F3
  VK_F4: 115, // F4
  VK_F5: 116, // F5
  VK_F6: 117, // F6
  VK_F7: 118, // F7
  VK_F8: 119, // F8
  VK_F9: 120, // F9
  VK_F10: 121, // F10
  VK_F11: 122, // F11
  VK_F12: 123, // F12

  VK_NUMLOCK: 144, // Num Lock
  VK_NUMPAD0: 96, // 0
  VK_NUMPAD1: 97, // 1
  VK_NUMPAD2: 98, // 2
  VK_NUMPAD3: 99, // 3
  VK_NUMPAD4: 100, // 4
  VK_NUMPAD5: 101, // 5
  VK_NUMPAD6: 102, // 6
  VK_NUMPAD7: 103, // 7
  VK_NUMPAD8: 104, // 8
  VK_NUMPAD9: 105, // 9
  VK_DECIMAL: 110, // .
  VK_MULTIPLY: 106, // *
  VK_PLUS: 107, // +
  VK_SUBTRACT: 109, // -
  VK_DIVIDE: 111, //
  VK_PAUSE: 19, // Pause Break
  VK_SCROLL: 145, // Scroll Lock

  A: 65, // A
  B: 66, // B
  C: 67, // C
  D: 68, // D
  E: 69, // E
  F: 70, // F
  G: 71, // G
  H: 72, // H
  I: 73, // I
  J: 74, // J
  K: 75, // K
  L: 76, // L
  M: 77, // M
  N: 78, // N
  O: 79, // O
  P: 80, // P
  Q: 81, // Q
  R: 82, // R
  S: 83, // S
  T: 84, // T
  U: 85, // U
  V: 86, // V
  W: 87, // W
  X: 88, // X
  Y: 89, // Y
  Z: 90, // Z

  NUMPAD0: 48, // 0
  NUMPAD1: 49, // 1
  NUMPAD2: 50, // 2
  NUMPAD3: 51, // 3
  NUMPAD4: 52, // 4
  NUMPAD5: 53, // 5
  NUMPAD6: 54, // 6
  NUMPAD7: 55, // 7
  NUMPAD8: 56, // 8
  NUMPAD9: 57, // 9
};

KeyEvent.__keyDownMap = {};

export default KeyEvent;
