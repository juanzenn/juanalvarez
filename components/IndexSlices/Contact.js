import React from 'react';

import { Envelope, GithubFill, TwitterFill, LinkedInV1Fill } from 'akar-icons';

export default function Contact({ slice }) {
  const { items } = slice;

  return (
    <>
      <hr className='w-10/12 my-4 mx-auto text-gray-400' />

      <div className='flex justify-center gap-4 pb-12'>
        {items.map((item, index) => {
          switch (item.contact_label) {
            case 'Mail':
              return (
                <a
                  key={`link-${index}`}
                  href='mailto:juanandres140299@gmail.com'>
                  <Envelope
                    className='hover:text-primary-600 transition-all'
                    size={36}
                  />
                </a>
              );
            case 'Twitter':
              return (
                <a key={`link-${index}`} href={item.contact_link.url}>
                  <TwitterFill
                    className='hover:text-primary-600 transition-all'
                    size={36}
                  />
                </a>
              );
            case 'Github':
              return (
                <a key={`link-${index}`} href={item.contact_link.url}>
                  <GithubFill
                    className='hover:text-primary-600 transition-all'
                    size={36}
                  />
                </a>
              );
            case 'Linkedin':
              return (
                <a key={`link-${index}`} href={item.contact_link.url}>
                  <LinkedInV1Fill
                    className='hover:text-primary-600 transition-all'
                    size={36}
                  />
                </a>
              );
          }
        })}
      </div>
    </>
  );
}
