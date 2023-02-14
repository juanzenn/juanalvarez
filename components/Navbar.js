import { Cross, TextAlignJustified } from "akar-icons";
import Link from "next/link";
import React, { useState } from "react";
import { clsx } from "../utils/clsx";

const LinkItem = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="block py-2 px-6 text-gray-800 transition-colors hover:bg-gray-50 hover:text-primary-700 lg:rounded-md lg:py-1 lg:px-3"
    >
      {children}
    </Link>
  </li>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // bg-white shadow
  const navbarClass = clsx(
    "transition-all bg-transparent sticky top-0 isolate z-10 flex h-[56px] flex-col items-center justify-center lg:flex-row lg:gap-8, py-2",
    scrolled &&
      "border-b border-gray-50 border-opacity-25 bg-white shadow lg:bg-opacity-30 lg:backdrop-blur-lg",
    open && "shadow-none border-none bg-white"
  );

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 200);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  // className="sticky top-0 isolate z-10 flex h-[56px] flex-col items-center justify-center border-b border-gray-50 border-opacity-25 bg-white py-2 shadow lg:flex-row lg:gap-8"

  return (
    <nav className={navbarClass}>
      <article className="flex w-full justify-between px-4 lg:w-max lg:px-8">
        <Link
          href="/"
          className="inline-block flex-shrink-0 text-xl font-semibold tracking-tighter text-primary-800 transition-all hover:text-primary-700"
        >
          Juan Alvarez
        </Link>

        <div className="flex w-full justify-end lg:hidden">
          <button className="lg:hidden " onClick={() => setOpen(!open)}>
            {open ? (
              <Cross className="text-primary-900" size={24} />
            ) : (
              <TextAlignJustified className="text-primary-900" size={24} />
            )}
          </button>
        </div>
      </article>

      <ul className="hidden w-screen items-center gap-4 font-medium lg:flex lg:justify-start">
        <LinkItem href="/">Home</LinkItem>
        <LinkItem href="/blog">Blog</LinkItem>
      </ul>

      {open && (
        <ul className="absolute top-[54px] z-20 flex w-screen flex-col gap-4 border-b border-gray-50 border-opacity-25 bg-white py-4 shadow lg:hidden">
          <LinkItem href="/">Home</LinkItem>
          <LinkItem href="/blog">Blog</LinkItem>
        </ul>
      )}
    </nav>
  );
}
