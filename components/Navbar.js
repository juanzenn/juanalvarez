import React, { useState, useEffect } from 'react';

import { TextAlignJustified } from 'akar-icons';

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
    <nav className='flex flex-col lg:flex-row py-2'>
      <div className='w-full flex justify-end px-4 lg:hidden'>
        <button className='lg:hidden' onClick={() => setOpen(!open)}>
          <TextAlignJustified size={24} />
        </button>
      </div>
      <ul
        className={
          open
            ? 'w-screen px-6 text-center lg:flex lg:gap-8 lg:justify-center'
            : 'hidden'
        }>
        <li className='font-medium text-gray-600 tracking-wide uppercase'>
          <a href='/#about' className='hover:text-primary-700 transition-all'>
            About
          </a>
        </li>
        <li className='font-medium text-gray-600 tracking-wide uppercase'>
          <a
            href='/#projects'
            className='hover:text-primary-700 transition-all'>
            Projects
          </a>
        </li>
        <li className='font-medium text-gray-600 tracking-wide uppercase'>
          <a href='/#blog' className='hover:text-primary-700 transition-all'>
            Blog
          </a>
        </li>
      </ul>
    </nav>
  );
}
