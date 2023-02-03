import { SliceZone } from "@prismicio/react";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import BlogPosts from "../components/IndexSlices/BlogPosts";
import Contact from "../components/IndexSlices/Contact";
import HeroAbout from "../components/IndexSlices/HeroAbout";
import Projects from "../components/IndexSlices/Projects";
import Layout from "../components/Layout";
import createClient from "../prismic";

export default function Home({ slices }) {
  return (
    <>
      <Head>
        <title>Juan Alvarez | Front-end web developer</title>
        <meta name="title" content="Juan Alvarez | Front-end web developer" />
        <meta
          name="description"
          content="I make websites and web applications for modern businesses. If you want to have a strong online presence, contact me. Let's work together."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juanalvarez.vercel.app/" />
        <meta
          property="og:title"
          content="Juan Alvarez | Front-end web developer"
        />
        <meta
          property="og:description"
          content="I make websites and web applications for modern businesses. If you want to have a strong online presence, contact me. Let's work together."
        />
        <meta property="og:image" content="/cover.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://juanalvarez.vercel.app/"
        />
        <meta
          property="twitter:title"
          content="Juan Alvarez | Front-end web developer"
        />
        <meta
          property="twitter:description"
          content="I make websites and web applications for modern businesses. If you want to have a strong online presence, contact me. Let's work together."
        />
        <meta property="twitter:image" content="/cover.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <Script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=juan-alvarez"
        ></Script>
      </Head>

      <Layout>
        <SliceZone
          slices={slices}
          components={{
            heroabout: HeroAbout,
            projects: Projects,
            blog_posts: BlogPosts,
            contact: Contact,
          }}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const doc = await client.getSingle("index");
  const slices = doc.data.body;

  return {
    props: { slices },
  };
}
