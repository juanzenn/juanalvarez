// @ts-check
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';

import Client from '../../prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { GithubFill, LinkedInV1Fill, TwitterFill } from 'akar-icons';

export default function BlogPost({ blogPost }) {
  return (
    <Layout>
      <Head>
        <title>{blogPost.title[0].text}</title>
        <meta name='description' content={blogPost.description[0].text} />

        <meta property='og:type' content='article' />
        <meta property='og:url' content='https://metatags.io/' />
        <meta property='og:title' content={blogPost.title[0].text} />
        <meta
          property='og:description'
          content={blogPost.description[0].text}
        />
        <meta property='og:image' content={blogPost.coverImage.src} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://metatags.io/' />
        <meta property='twitter:title' content={blogPost.title[0].text} />
        <meta
          property='twitter:description'
          content={blogPost.description[0].text}
        />
        <meta property='twitter:image' content={blogPost.coverImage.src} />
      </Head>

      <main className='w-screen lg:w-7/12 px-4 mx-auto py-8'>
        <header>
          <article className='text-4xl font-bold tracking-tighter mb-2'>
            <RichText render={blogPost.title} />
          </article>
          <article className='text-gray-600 prose mb-8'>
            <RichText render={blogPost.description} />
          </article>
          <figure className='relative w-screen md:w-full -left-4 md:left-0 h-[60vh] mb-8'>
            <Image
              src={blogPost.coverImage.src}
              alt={
                blogPost.coverImage.alt
                  ? blogPost.coverImage.alt
                  : blogPost.title[0].text
              }
              layout='fill'
              objectFit='cover'
            />
          </figure>
        </header>

        <main className='mb-6'>
          <article className='prose lg:prose-lg prose prose-primary max-w-none'>
            <RichText render={blogPost.content} />
          </article>
        </main>

        <section className='flex flex-col lg:flex-row gap-4 items-center my-8'>
          <hr className='w-full lg:w-2/3 text-gray-300' />
          <article className='w-full lg:w-1/3 flex justify-between gap-4 px-4'>
            <span className='uppercase text-gray-400'>share</span>
            <section className='space-x-12 lg:space-x-4'>
              <a
                className='text-primary-600 hover:text-primary-700 font-semibold transition-colors '
                href='#'>
                Twitter
              </a>
              <a
                className='text-primary-600 hover:text-primary-700 font-semibold transition-colors '
                href='#'>
                Facebook
              </a>
            </section>
          </article>
        </section>

        <section className='my-8'>
          <section className='flex gap-4 items-center'>
            <figure className='w-12 h-12 flex-shrink-0 bg-gray-300 rounded-full'></figure>
            <article>
              <strong className='text-sm lg:text-base mb-1'>
                Juan Alvarez
              </strong>
              <p className='prose prose-sm mb-4'>
                I’m a front-end developer from Venezuela. I do freelance work
                and create content about web development and JavaScript.
              </p>
              <section className='flex gap-2'>
                <a
                  className='text-primary-600 hover:text-primary-700 font-semibold transition-colors'
                  href=''>
                  <TwitterFill />
                </a>
                <a
                  className='text-primary-600 hover:text-primary-700 font-semibold transition-colors'
                  href=''>
                  <LinkedInV1Fill />
                </a>
                <a
                  className='text-primary-600 hover:text-primary-700 font-semibold transition-colors'
                  href=''>
                  <GithubFill />
                </a>
              </section>
            </article>
          </section>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const response = await Client.query(
    Prismic.Predicates.at('document.type', 'blog_post')
  );

  const paths = response.results.reduce((acc, value) => {
    const newPath = {
      params: {
        slug: value.data.slug,
      },
    };
    acc.push(newPath);
    return acc;
  }, []);

  return {
    paths: [...paths],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await Client.query(
    Prismic.Predicates.at('my.blog_post.slug', params.slug)
  );

  const { data } = response.results[0];

  const blogPost = {
    title: data.title,
    description: data.description,
    coverImage: {
      alt: data.cover.alt,
      src: data.cover.url,
    },
    content: data.content,
  };

  return {
    props: {
      blogPost,
    },
  };
};
