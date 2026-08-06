import classNames from "classnames";
import { twMerge, type ClassNameValue } from "tailwind-merge";

export const cn = (...args: ClassNameValue[]) => {
  return classNames(twMerge(...args));
};
