import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function HeroAbout({ slice }) {
  return (
    <div className='px-4 py-12 lg:w-3/4 mx-auto flex flex-col items-start justify-center'>
      <span className='text-5xl text-primary-700 font-bold tracking-tighter mb-4'>
        <RichText render={slice.primary.title} />
      </span>

      <span className='inline-block prose-lg max-w-lg'>
        <RichText render={slice.primary.about} />
      </span>
    </div>
  );
}
