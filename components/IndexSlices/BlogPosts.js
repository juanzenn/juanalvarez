import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function BlogPosts({ slice }) {
  const { primary, items } = slice;

  return (
    <div className='px-4 py-12  lg:w-3/4 mx-auto'>
      <header className='mb-4'>
        <span className='text-2xl font-bold tracking-tight'>
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
      <main className='grid lg:grid-cols-3 gap-4'>
        {items.map((item, index) => (
          <article key={`article-${index}`}>
            <header className='mb-4'>
              <a
                href={item.blog_link.url}
                target='_blank'
                className='block mb-2 h-40 rounded-md cursor-pointer bg-cover bg-center bg-no-repeat hover:brightness-105 transform transition-all duration-300'
                style={{ backgroundImage: `url(${item.blog_cover.url})` }}></a>
              <a
                href={item.blog_link.url}
                target='_blank'
                className='text-xl font-bold tracking-tight hover:text-primary-600 transition-colors'>
                <RichText render={item.blog_title} />
              </a>
            </header>
            <p className='prose mb-2'>
              <RichText render={item.blog_description} />
            </p>
            <a
              href={item.blog_link.url}
              target='_blank'
              className='w-max block text-right cursor-pointer text-primary-600 hover:underline transition-all'>
              Read more...
            </a>
          </article>
        ))}
      </main>
    </div>
  );
}
