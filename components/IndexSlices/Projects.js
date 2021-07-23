import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function Projects({ slice }) {
  const { primary, items } = slice;

  return (
    <div className='px-4 py-12 lg:w-2/3 mx-auto'>
      <header className='mb-4'>
        <span className='text-2xl font-bold tracking-tight'>
          <RichText render={primary.title} />
        </span>
        <span className='text-lg text-gray-700'>
          {primary.subtitle.length == 0 ? (
            ``
          ) : (
            <RichText render={primary.subtitle} />
          )}
        </span>
      </header>
      <main className='grid lg:grid-cols-2 gap-12'>
        {items.map((item, index) => (
          <article key={`project-${index}`}>
            <header className='mb-2'>
              <span className='uppercase tracking-wider font-bold text-sm text-blue-700'>
                {item.project_type}
              </span>
              <span className='text-2xl font-bold tracking-tight'>
                <RichText render={item.project_title} />
              </span>
            </header>
            <p className='text-lg text-gray-900'>
              <RichText render={item.project_description} />
            </p>
            <a
              href={item.link.url}
              className='block w-full mt-6 py-2 text-white font-semibold text-base text-center bg-blue-700 hover:bg-blue-800 rounded transition duration-300'>
              Live View
            </a>
          </article>
        ))}
      </main>
    </div>
  );
}
