// @ts-check
import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

import Client from '../../prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { ArrowRight } from 'akar-icons';

export default function Index({ posts }) {
  return (
    <>
      <Head>
        <title>All Blog Posts - Juan Alvarez</title>
      </Head>

      <Layout>
        <section className='px-4 mx-auto w-full lg:w-7/12 mb-2'>
          <header className='py-12'>
            <h1 className='text-4xl font-bold tracking-tight mb-2'>
              Blog Posts
            </h1>
            <p className='prose prose-sm mb-6'>
              My notes on JavaScript, web development or my personal life and
              projects.
            </p>
          </header>

          <section className='px-6 mb-12'>
            {posts.map(item => (
              <article key={item.id} className='mb-6'>
                <h3 className='font-bold tracking-tight text-2xl mb-1'>
                  {item.title}
                </h3>
                <p className='text-gray-600 leading-relaxed mb-2'>
                  {item.description}
                </p>
                <Link href={`/blog/${item.slug}`}>
                  <a className='flex gap-2 w-max items-center hover:text-primary-600 text-gray-400 transition-colors'>
                    Read more <ArrowRight size={20} />
                  </a>
                </Link>
              </article>
            ))}
          </section>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await Client.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    {
      orderings: '[document.last_publication_date desc]',
    }
  );

  const documents = response.results;
  const posts = documents.reduce((acc, item) => {
    const newPost = {
      id: item.id,
      title: item.data.title[0].text,
      slug: item.data.slug,
      description: item.data.description[0].text,
    };
    acc.push(newPost);
    return acc;
  }, []);

  return {
    props: {
      posts,
    },
  };
};
