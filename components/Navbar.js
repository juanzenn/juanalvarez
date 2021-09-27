import React, { useState, useEffect } from 'react';

import { TextAlignJustified } from 'akar-icons';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState('');

  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <nav className='flex flex-col py-2 lg:flex-row items-center lg:gap-8'>
      <article className='w-full lg:w-max flex justify-between px-4 lg:px-8'>
        <Link href='/'>
          <a className='inline-block flex-shrink-0 text-primary-800 hover:text-primary-700 font-semibold tracking-tighter text-xl transition-all'>
            Juan Alvarez
          </a>
        </Link>
        <div className='w-full flex justify-end lg:hidden'>
          <button className='lg:hidden ' onClick={() => setOpen(!open)}>
            <TextAlignJustified
              className='hover:text-primary-800 transition-all'
              size={24}
            />
          </button>
        </div>
      </article>

      <ul
        className={
          open
            ? 'w-screen lg:flex gap-4 lg:justify-start items-center font-medium'
            : 'hidden'
        }>
        <li>
          <Link href='/'>
            <a className='inline-block py-4 lg:py-1 px-6 lg:px-3 lg:rounded-md text-gray-800 hover:text-primary-700 hover:bg-gray-50 transition-colors'>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            <a className='inline-block py-4 lg:py-1 px-6 lg:px-3 lg:rounded-md text-gray-800 hover:text-primary-700 hover:bg-gray-50 transition-colors'>
              Blog
            </a>
          </Link>
        </li>
        <li>
          <Link href='/#projects'>
            <a className='inline-block py-4 lg:py-1 px-6 lg:px-3 lg:rounded-md text-gray-800 hover:text-primary-700 hover:bg-gray-50 transition-colors'>
              Projects
            </a>
          </Link>
        </li>
        {/* <li className='font-medium tracking-wide uppercase'>
          <Link href='/#about'>
            <a className='hover:text-primary-700 transition-all'>About</a>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
