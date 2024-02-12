class DOM {
  get(id) {
    return document.getElementById(id);
  }

  getStyleValue(element, name) {
    if (element.currentStyle) {
      return element.currentStyle[name];
    } else {
      const style = document.defaultView.getComputedStyle(element, null);
      return style[name];
    }
  }

  hide(element) {
    element.style.display = "none";
  }

  show(element) {
    element.style.display = "block";
  }

  remove(element) {
    element.parentNode.removeChild(element);
  }

  hasClass(element, className) {
    const names = element.className.split(/\s+/);
    for (let i = 0; i < names.length; i++) {
      if (names[i] == className) {
        return true;
      }
    }
    return false;
  }

  addClass(element, className) {
    if (!this.hasClass(element, className)) {
      element.className += " " + className;
    }
  }

  removeClass(element, className) {
    if (this.hasClass(element, className)) {
      const names = element.className.split(/\s+/);
      const newClassName = [];
      for (let i = 0; i < names.length; i++) {
        if (names[i] != className) {
          newClassName.push(names[i]);
        }
      }
      element.className = newClassName.join(" ");
    }
  }
}

export default DOM;
