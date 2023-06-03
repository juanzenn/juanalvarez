import React from "react";
import { cn } from "~/lib/cn";

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
      className={cn(
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
