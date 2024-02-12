const random = (min, max) => {
  return Math.floor((max - min + 1) * Math.random()) + min;
};

const pointtoradian = Math.PI / 180;

export default {
  random,
  pointtoradian,
};
