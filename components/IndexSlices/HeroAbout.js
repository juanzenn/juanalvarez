import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function HeroAbout({ slice }) {
  return (
    <div className='px-4 py-6 lg:w-2/3 mx-auto flex flex-col items-start justify-center'>
      <span className='text-5xl text-blue-700 font-bold tracking-tight mb-2'>
        <RichText render={slice.primary.title} />
      </span>
      <section className='space-y-4 lg:w-8/12'>
        <span className='text-lg text-gray-900 tracking-wide space-y-4'>
          <RichText render={slice.primary.about} />
        </span>
      </section>
    </div>
  );
}
