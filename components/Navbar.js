import React, { useEffect, useState } from "react";

import { TextAlignJustified } from "akar-icons";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState("");

  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <nav className="flex flex-col py-2 lg:flex-row items-center lg:gap-8">
      <article className="w-full lg:w-max flex justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="inline-block flex-shrink-0 text-primary-800 hover:text-primary-700 font-semibold tracking-tighter text-xl transition-all"
        >
          Juan Alvarez
        </Link>
        <div className="w-full flex justify-end lg:hidden">
          <button className="lg:hidden " onClick={() => setOpen(!open)}>
            <TextAlignJustified
              className="hover:text-primary-800 transition-all"
              size={24}
            />
          </button>
        </div>
      </article>

      <ul
        className={
          open
            ? "w-screen lg:flex gap-4 lg:justify-start items-center font-medium"
            : "hidden"
        }
      >
        <li>
          <Link
            href="/"
            className="inline-block py-4 lg:py-1 px-6 lg:px-3 lg:rounded-md text-gray-800 hover:text-primary-700 hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="inline-block py-4 lg:py-1 px-6 lg:px-3 lg:rounded-md text-gray-800 hover:text-primary-700 hover:bg-gray-50 transition-colors"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/#projects"
            className="inline-block py-4 lg:py-1 px-6 lg:px-3 lg:rounded-md text-gray-800 hover:text-primary-700 hover:bg-gray-50 transition-colors"
          >
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
}
