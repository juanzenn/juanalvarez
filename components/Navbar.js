import { TextAlignJustified } from "akar-icons";
import Link from "next/link";
import React, { useState } from "react";

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

  return (
    <nav className="sticky top-0 isolate z-10 flex h-[56px] flex-col items-center justify-center border-gray-50 border-opacity-25 bg-white py-2 lg:flex-row lg:gap-8 lg:border-b lg:shadow">
      <article className="flex w-full justify-between px-4 lg:w-max lg:px-8">
        <Link
          href="/"
          className="inline-block flex-shrink-0 text-xl font-semibold tracking-tighter text-primary-800 transition-all hover:text-primary-700"
        >
          Juan Alvarez
        </Link>

        <div className="flex w-full justify-end lg:hidden">
          <button className="lg:hidden " onClick={() => setOpen(!open)}>
            <TextAlignJustified
              className="transition-all hover:text-primary-800"
              size={24}
            />
          </button>
        </div>
      </article>

      <ul className="hidden w-screen items-center gap-4 font-medium lg:flex lg:justify-start">
        <LinkItem href="/">Home</LinkItem>
        <LinkItem href="/blog">Blog</LinkItem>
        <LinkItem href="/#projects">Projects</LinkItem>
      </ul>

      {open && (
        <ul className="absolute top-[56px] flex w-screen flex-col gap-4 border-b border-gray-50 border-opacity-25 bg-white py-4 shadow lg:hidden">
          <LinkItem href="/">Home</LinkItem>
          <LinkItem href="/blog">Blog</LinkItem>
          <LinkItem href="/#projects">Projects</LinkItem>
        </ul>
      )}
    </nav>
  );
}
