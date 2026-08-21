"use client";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useScroll } from "~/hooks/useScroll";
import { cn } from "~/lib/cn";
import MobileMenu, { MOBILE_MENU_ID } from "./MobileMenu";
import ThemeButton from "./ThemeButton";

type Props = {
  defaultTheme?: string;
};

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const isCurrentPath = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar({ defaultTheme }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((current) => !current), []);

  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsOpen(false);
  }

  const navbarClass = cn(
    "transition-all bg-transparent sticky top-0 isolate z-10 flex h-[56px] backdrop-blur flex-col items-center justify-center lg:flex-row lg:gap-8 py-2",
    scrolled && "bg-white/50 dark:bg-gray-800/50 shadow"
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <nav className={navbarClass}>
      <article className="flex w-full justify-between px-4 lg:w-max lg:px-8">
        <Link
          href="/"
          className="inline-block shrink-0 text-xl font-semibold tracking-tighter text-primary-800 transition-all hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
        >
          Juan Alvarez
        </Link>

        <div className="flex w-full justify-end lg:hidden">
          <button
            ref={triggerRef}
            className="lg:hidden"
            type="button"
            aria-label="Main menu"
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={toggleMenu}
          >
            <Bars3Icon className="h-6 w-6 text-primary-900 dark:text-primary-500" />
          </button>
        </div>
      </article>

      <ul className="hidden w-screen items-center gap-4 font-medium lg:flex lg:justify-start">
        {NAV_ITEMS.map(({ href, label }) => (
          <LinkItem
            key={href}
            href={href}
            active={isCurrentPath(pathname, href)}
          >
            {label}
          </LinkItem>
        ))}
      </ul>

      <MobileMenu open={isOpen} onClose={closeMenu} triggerRef={triggerRef}>
        {NAV_ITEMS.map(({ href, label }) => (
          <LinkItem
            key={href}
            href={href}
            active={isCurrentPath(pathname, href)}
            onClick={closeMenu}
          >
            {label}
          </LinkItem>
        ))}

        <li className="self-end">
          <ThemeButton defaultTheme={defaultTheme} />
        </li>
      </MobileMenu>

      <span className="hidden lg:block">
        <ThemeButton defaultTheme={defaultTheme} />
      </span>
    </nav>
  );
}

type LinkItemProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const LinkItem = ({
  href,
  children,
  active = false,
  onClick,
}: LinkItemProps) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block py-2 px-6 text-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 lg:rounded-md lg:py-1 lg:px-3 lg:text-base lg:transition-colors",
        active &&
          "bg-gray-100 text-primary-800 dark:bg-gray-700 dark:text-primary-400"
      )}
    >
      {children}
    </Link>
  </li>
);
