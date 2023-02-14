import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const clsx = (...args) => {
  return classNames(twMerge(...args));
};
