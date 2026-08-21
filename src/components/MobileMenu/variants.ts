import { Variant } from "framer-motion";

const delay = 0.1;

const backdropVariants: { [key: string]: Variant } = {
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

const menuVariants: { [key: string]: Variant } = {
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
      type: "tween",
      duration: 0.1,
    },
  },
};

export { backdropVariants, menuVariants };
