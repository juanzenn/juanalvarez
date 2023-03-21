import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useState } from "react";
import { useScroll } from "~/hooks/useScroll";
import { clsx } from "~/utils/clsx";
import MobileMenu from "./MobileMenu";

export const LinkItem = ({
  href,
  children,
  ...rest
}: LinkProps & React.HTMLAttributes<HTMLLIElement>) => (
  <li {...rest}>
    <Link
      href={href}
      className="block py-2 px-6 text-xl font-medium text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary-700 lg:rounded-md lg:py-1 lg:px-3 lg:text-base lg:font-normal"
    >
      {children}
    </Link>
  </li>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(50);

  const handleClose = () => setOpen(!open);

  const navbarClass = clsx(
    "transition-all bg-transparent sticky top-0 isolate z-10 flex h-[56px] backdrop-blur-sm flex-col items-center justify-center lg:flex-row lg:gap-8, py-2",
    scrolled && "bg-white/30 shadow"
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

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
          <button className="lg:hidden " onClick={handleClose}>
            <Bars3Icon className="h-6 w-6 text-primary-900" />
          </button>
        </div>
      </article>

      <ul className="hidden w-screen items-center gap-4 font-medium lg:flex lg:justify-start">
        <LinkItem href="/">Home</LinkItem>
        <LinkItem href="/blog">Blog</LinkItem>
        <LinkItem href="/contact">Contact</LinkItem>
      </ul>

      <MobileMenu open={open} handleClose={handleClose}>
        <LinkItem onClick={handleClose} href="/">
          Home
        </LinkItem>
        <LinkItem onClick={handleClose} href="/blog">
          Blog
        </LinkItem>
        <LinkItem onClick={handleClose} href="/contact">
          Contact
        </LinkItem>
      </MobileMenu>
    </nav>
  );
}