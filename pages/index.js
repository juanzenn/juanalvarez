import Head from 'next/head';

import { Client } from '../prismic';

import SliceZone from '../components/IndexSlices/SliceZone';

export default function Home({ slices }) {
  return (
    <>
      <Head>
        <title>Juan Alvarez</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
