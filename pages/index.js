import Head from 'next/head';

import { Client } from '../prismic';

import SliceZone from '../components/IndexSlices/SliceZone';
import Navbar from '../components/Navbar';

export default function Home({ slices }) {
  return (
    <>
      <Head>
        <title>Juan Alvarez | Front-end web developer</title>
        <meta name='title' content='Juan Alvarez | Front-end web developer' />
        <meta
          name='description'
          content="I make websites and web applications for modern businesses. If you want to have a strong online presence, contact me. Let's work together."
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://juanalvarez.vercel.app/' />
        <meta
          property='og:title'
          content='Juan Alvarez | Front-end web developer'
        />
        <meta
          property='og:description'
          content="I make websites and web applications for modern businesses. If you want to have a strong online presence, contact me. Let's work together."
        />
        <meta property='og:image' content='' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content='https://juanalvarez.vercel.app/'
        />
        <meta
          property='twitter:title'
          content='Juan Alvarez | Front-end web developer'
        />
        <meta
          property='twitter:description'
          content="I make websites and web applications for modern businesses. If you want to have a strong online presence, contact me. Let's work together."
        />
        <meta property='twitter:image' content='' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <Navbar />

      <SliceZone slices={slices} />
    </>
  );
}

export async function getStaticProps(context) {
  const client = Client();
  const doc = await client.getSingle('index');
  const slices = doc.data.body;

  return {
    props: { slices },
  };
}
