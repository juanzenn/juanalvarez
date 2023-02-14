const spring = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.5,
};
const delay = 0.125;

const backdropVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      delay,
      type: "tween",
      duration: delay,
    },
  },
};

const menuVariants = {
  visible: {
    x: 0,
    transition: {
      delay,
      ...spring,
    },
  },
  hidden: {
    x: "100%",
    transition: {
      ...spring,
    },
  },
};

export { backdropVariants, menuVariants };
