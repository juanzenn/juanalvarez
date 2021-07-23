import Head from 'next/head';

import { Client } from '../prismic';

import SliceZone from '../components/IndexSlices/SliceZone';
import Navbar from '../components/Navbar';

export default function Home({ slices }) {
  return (
    <>
      <Head>
        <title>Juan Alvarez</title>
        <link rel='icon' href='/favicon.ico' />
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
