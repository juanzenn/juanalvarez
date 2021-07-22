import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function BlogPosts({ slice }) {
  const { primary, items } = slice;

  return (
    <div className='px-4 py-12  lg:w-2/3 mx-auto'>
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
      <main className='grid lg:grid-cols-3 gap-4'>
        {items.map((item, index) => (
          <article key={`article-${index}`}>
            <header className=''>
              <a
                className='block h-40 rounded-md cursor-pointer bg-cover bg-center bg-no-repeat hover:brightness-110 transform hover:scale-105 hover:shadow-3xl transition-all duration-300'
                style={{ backgroundImage: `url(${item.blog_cover.url})` }}></a>
              <span className='text-2xl font-bold tracking-tight'>
                <RichText render={item.blog_title} />
              </span>
            </header>
            <p className='text-lg font-light text-gray-600'>
              <RichText render={item.blog_description} />
            </p>
          </article>
        ))}
      </main>
    </div>
  );
}
