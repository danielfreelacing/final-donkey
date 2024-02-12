class Root {
  fn = new Function();
  /**
   * @param {Function} childClass
   * @param {Function} parentClass
   */
  inherit(childClass, parentClass) {
    const Constructor = new Function();
    Constructor.prototype = parentClass.prototype;
    childClass.prototype = new Constructor();
    childClass.prototype.constructor = childClass;
    childClass.superclass = parentClass.prototype;

    if (childClass.prototype.constructor === Object.prototype.constructor) {
      childClass.prototype.constructor = parentClass;
    }
  }
  /**
   * @param {Object} obj
   * @param {Object} newProperties
   */
  extend(obj, newProperties) {
    for (let key in newProperties) {
      if (newProperties.hasOwnProperty(key)) {
        obj[key] = newProperties[key];
      }
    }

    return obj;
  }
  /**
   * @param {Object} obj
   * @param {Function} targetClass
   * @param {Object} newProperties
   */
  copy(obj, targetClass, newProperties) {
    if (typeof obj !== "object") {
      return obj;
    }

    const value = obj.valueOf();
    if (obj !== value) {
      return new obj.constructor(value);
    }

    let o;
    if (obj instanceof obj.constructor && obj.constructor !== Object) {
      if (targetClass) {
        o = new targetClass();
      } else {
        o = this.clone(obj.constructor.prototype);
      }

      for (let key in obj) {
        if (targetClass || obj.hasOwnProperty(key)) {
          o[key] = obj[key];
        }
      }
    } else {
      o = {};
      for (let key in obj) {
        o[key] = obj[key];
      }
    }

    if (newProperties) {
      for (let key in newProperties) {
        o[key] = newProperties[key];
      }
    }

    return o;
  }
  /**
   * @param {Object} obj
   */
  clone(obj) {
    this.__cloneFunc.prototype = obj;
    return new this.__cloneFunc();
  }
  /**
   * @private
   */
  __cloneFunc() {}
  /**
   * @param {Function} func
   * @param {Object} scope
   */
  delegate(func, scope) {
    scope = scope || window;

    if (arguments.length > 2) {
      const args = Array.prototype.slice.call(arguments, 2);

      return function () {
        return func.apply(scope, args);
      };
    } else {
      return function () {
        return func.call(scope);
      };
    }
  }
}

export default Root;
