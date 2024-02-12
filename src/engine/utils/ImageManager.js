const ImageManager = {
  /**
   * @private
   */
  __loadList: {},
  /**
   * @private
   */
  __loadImage: (item, callback) => {
    const image = new Image();
    image.onload = function () {
      ImageManager.__loadList[item.id] = image;
      callback();
    };
    image.src = item.src;
  },
  /**
   * @param {Array} images @format {id: '', src: ''}
   * @param {Function} statechange
   */
  load: (images, statechange, __index) => {
    __index = __index || 0;
    if (images[__index]) {
      ImageManager.__loadImage(images[__index], function () {
        ImageManager.load(images, statechange, __index + 1);
      });
    }
    statechange(__index);
  },
  /**
   * @param {String} id
   */
  get: (id) => {
    return ImageManager.__loadList[id];
  },
};

export default ImageManager;
