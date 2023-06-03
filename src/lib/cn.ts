import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";

export const cn = (...args: ClassNameValue[]) => {
  return classNames(twMerge(...args));
};
