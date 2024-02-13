const getDonkeyFrames = (animName) => {
  const frames = {
    daiji: [
      {
        x: 0,
        y: 0,
      },
    ],
    run: [
      {
        x: 0,
        y: 0,
        duration: 10,
      },
      {
        x: 128,
        y: 0,
        duration: 10,
      },
      {
        x: 256,
        y: 0,
        duration: 10,
      },
      {
        x: 384,
        y: 0,
        duration: 10,
      },
      {
        x: 512,
        y: 0,
        duration: 10,
      },
      {
        x: 640,
        y: 0,
        duration: 10,
      },
      {
        x: 768,
        y: 0,
        duration: 10,
      },
      {
        x: 896,
        y: 0,
        duration: 10,
      },
      {
        x: 1024,
        y: 0,
        duration: 10,
      },
      {
        x: 1152,
        y: 0,
        duration: 10,
      },
      {
        x: 1280,
        y: 0,
        duration: 10,
      },
      {
        x: 1408,
        y: 0,
        duration: 10,
      },
      {
        x: 1536,
        y: 0,
        duration: 10,
      },
    ],
    superjump: [
      {
        x: 0,
        y: 0,
        duration: 30,
      },
      {
        x: 128,
        y: 0,
        duration: 30,
      },
      {
        x: 256,
        y: 0,
        duration: 30,
      },
      {
        x: 384,
        y: 0,
        duration: 30,
      },
      {
        x: 512,
        y: 0,
        duration: 30,
      },
      {
        x: 640,
        y: 0,
        duration: 30,
      },
      {
        x: 768,
        y: 0,
        duration: 30,
      },
      {
        x: 896,
        y: 0,
        duration: 30,
      },
      {
        x: 1024,
        y: 0,
        duration: 30,
      },
      {
        x: 1152,
        y: 0,
        duration: 30,
      },
      {
        x: 1280,
        y: 0,
        duration: 30,
      },
      {
        x: 1408,
        y: 0,
        duration: 30,
      },
    ],
    jump: [
      {
        x: 0,
        y: 0,
        duration: 10,
        collRect: [[50, 93, 28, 15]],
      },
    ],
    dead: [
      {
        x: 0,
        y: 0,
        duration: 20,
      },
      {
        x: 128,
        y: 0,
        duration: 20,
      },
      {
        x: 256,
        y: 0,
        duration: 20,
      },
      {
        x: 384,
        y: 0,
        duration: 20,
      },
      {
        x: 512,
        y: 0,
        duration: 20,
      },
      {
        x: 640,
        y: 0,
        duration: 20,
      },
    ],
  };
  return frames[animName];
};

export { getDonkeyFrames };
