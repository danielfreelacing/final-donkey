class ScriptManager {
  /**
   * @private
   */
  __loadScript(url, callback) {
    const script = document.createElement("script");
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          callback.call();
        }
      };
    } else {
      script.onload = callback;
    }
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  /**
   * @param {Array} urls
   * @param {Function} statechange
   */
  load(urls, statechange, __index) {
    __index = __index || 0;
    if (urls[__index]) {
      this.__loadScript(urls[__index], function () {
        this.load(urls, statechange, __index + 1);
      });
    }
    statechange(__index);
  }
}
