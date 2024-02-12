const getEffectFrames = (animName) => {
  const frames = {
    cloud: [
      {
        x: 0,
        y: 0,
        duration: 30,
      },
      {
        x: 64,
        y: 0,
        duration: 30,
      },
      {
        x: 128,
        y: 0,
        duration: 30,
      },
      {
        x: 172,
        y: 0,
        duration: 30,
      },
    ],
  };
  return frames[animName];
};

export { getEffectFrames };
