import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function Projects({ slice }) {
  const { primary, items } = slice;

  return (
    <div className='px-4 py-12 lg:w-2/3 mx-auto'>
      <header className='mb-8'>
        <span className='text-4xl font-bold tracking-tight'>
          <RichText render={primary.title} />
        </span>
        <span className='text-base font-light tracking-wide'>
          {primary.subtitle.length == 0 ? (
            ``
          ) : (
            <RichText render={primary.subtitle} />
          )}
        </span>
      </header>
      <main className='grid lg:grid-cols-2 gap-8'>
        {items.map((item, index) => (
          <article key={`project-${index}`}>
            <header className='mb-2'>
              <span className='uppercase tracking-wider font-bold text-sm text-blue-300'>
                {item.project_type}
              </span>
              <a
                href={item.link.url}
                className='text-2xl font-bold tracking-tight hover:text-blue-300 transition-colors'>
                <RichText render={item.project_title} />
              </a>
            </header>
            <p className='text-lg'>
              <RichText render={item.project_description} />
            </p>
          </article>
        ))}
      </main>
    </div>
  );
}
