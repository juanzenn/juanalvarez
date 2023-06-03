import React from "react";
import { cn } from "~/lib/cn";

type HeadingProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function H1({ children, className, ...rest }: HeadingProps) {
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...rest }: HeadingProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...rest }: HeadingProps) {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...rest }: HeadingProps) {
  return (
    <h4
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...rest}
    >
      {children}
    </h4>
  );
}
