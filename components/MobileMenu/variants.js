const spring = {
  type: "tween",
};
const delay = 0.1;

const backdropVariants = {
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      delay,
      type: "tween",
      duration: 0.125,
    },
  },
};

const menuVariants = {
  visible: {
    x: 0,
    transition: {
      delay,
      type: "tween",
      duration: 0.125,
    },
  },
  hidden: {
    x: "100%",
    transition: {
      ...spring,
      duration: 0.1,
    },
  },
};

export { backdropVariants, menuVariants };
