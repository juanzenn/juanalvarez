import React from "react";
import { clsx } from "~/utils/clsx";

type Props = {
  children: React.ReactNode;
  size?: "small" | "base" | "medium" | "large";
} & React.HTMLAttributes<HTMLParagraphElement>;

export default function Paragraph({
  children,
  size = "base",
  className,
  ...rest
}: Props) {
  const sizes = {
    small: "text-sm",
    base: "text-base",
    medium: "text-lg",
    large: "text-xl",
  };

  return (
    <p
      className={clsx(
        "leading-7 text-gray-700 dark:text-gray-200",
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
