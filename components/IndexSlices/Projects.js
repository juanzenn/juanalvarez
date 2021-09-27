import React from 'react';

import { RichText } from 'prismic-reactjs';
import { GithubFill, LinkOut } from 'akar-icons';

export default function Projects({ slice }) {
  const { primary, items } = slice;

  return (
    <div className='px-4 py-12 lg:w-3/4 mx-auto'>
      <header className='mb-4'>
        <span className='text-4xl font-bold tracking-tight'>
          <RichText render={primary.title} />
        </span>
        <span className='text-gray-600'>
          {primary.subtitle.length == 0 ? (
            ``
          ) : (
            <RichText render={primary.subtitle} />
          )}
        </span>
      </header>

      <main className='grid lg:grid-cols-2 gap-6'>
        {items.map((item, index) => (
          <article key={`project-${index}`}>
            <header className='mb-2'>
              <span className='uppercase tracking-wide font-bold text-sm text-primary-700'>
                {item.project_type}
              </span>
              <span className='text-2xl font-bold tracking-tight'>
                <RichText render={item.project_title} />
              </span>
            </header>

            <article className='prose mb-4'>
              <RichText render={item.project_description} />
            </article>

            <section className='flex justify-center items-center gap-6'>
              <a
                href={item.github_link.url}
                className='flex items-center gap-2 w-max py-2 px-6 text-white font-semibold text-base text-center bg-gray-700 hover:bg-gray-800 rounded transition duration-300'>
                GitHub
                <GithubFill size={20} />
              </a>

              <a
                href={item.link.url}
                className='flex items-center gap-2 w-max py-2 px-6 text-white font-semibold text-base text-center bg-primary-700 hover:bg-primary-800 rounded transition duration-300'>
                Live View
                <LinkOut size={20} />
              </a>
            </section>
          </article>
        ))}
      </main>
    </div>
  );
}
