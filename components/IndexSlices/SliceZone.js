import React from 'react';
import BlogPosts from './BlogPosts';
import Projects from './Projects';
import Contact from './Contact';
import HeroAbout from './HeroAbout';

export default function SliceZone(props) {
  const { slices } = props;

  return (
    <main>
      {slices.map((slice, index) => {
        switch (slice.slice_type) {
          case 'heroabout':
            return (
              <section id='about' key={`slice-${index}`}>
                <HeroAbout slice={slice} />
              </section>
            );
          case 'projects':
            return (
              <section className='py-4' id='projects' key={`slice-${index}`}>
                <Projects slice={slice} />
              </section>
            );
          case 'blog_posts':
            return (
              <section className='py-4' id='blog' key={`slice-${index}`}>
                <BlogPosts slice={slice} />
              </section>
            );
          case 'contact':
            return (
              <section key={`slice-${index}`}>
                <Contact slice={slice} />
              </section>
            );
        }
      })}
    </main>
  );
}
