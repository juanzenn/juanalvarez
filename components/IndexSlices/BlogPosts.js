import React from 'react';

import { RichText } from 'prismic-reactjs';

export default function BlogPosts({ slice }) {
  const { primary, items } = slice;

  return (
    <div className='px-4 py-12  lg:w-2/3 mx-auto'>
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
            <header className=''>
              <a
                className='block mb-2 h-40 rounded-md cursor-pointer bg-cover bg-center bg-no-repeat hover:brightness-105 transform transition-all duration-300'
                style={{ backgroundImage: `url(${item.blog_cover.url})` }}></a>
              <span className='text-xl font-bold'>
                <RichText render={item.blog_title} />
              </span>
            </header>
            <p className='text-base text-gray-700 mb-2 mt-4'>
              <RichText render={item.blog_description} />
            </p>
            <a className='w-max block text-right cursor-pointer text-gray-600 hover:text-blue-700 transition-all'>
              Read more
            </a>
          </article>
        ))}
      </main>
    </div>
  );
}
