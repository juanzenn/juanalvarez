import createClient from "@/prismic";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { InferGetStaticPropsType, PreviewData } from "next";
import Head from "next/head";
import React from "react";
import BlogPosts from "~/components/IndexSlices/BlogPosts";
import Contact from "~/components/IndexSlices/Contact";
import HeroAbout from "~/components/IndexSlices/HeroAbout";
import Projects from "~/components/IndexSlices/Projects";
import Layout from "~/components/Layout";

export default function Home({
  slices,
  latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const contactSlice = slices.find(
    (s) => s.slice_type === "contact"
  ) as Content.IndexDocumentDataBodyContactSlice;

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
      </Head>

      <Layout>
        <SliceZone
          slices={slices}
          components={{
            heroabout: HeroAbout,
            projects: Projects,
            contact: () => null,
          }}
        />

        <BlogPosts posts={latestPosts} />
        {contactSlice && <Contact slice={contactSlice} />}
      </Layout>
    </>
  );
}

export async function getStaticProps({
  previewData,
}: {
  previewData: PreviewData;
}) {
  const client = createClient({ previewData });

  const indexDoc = await client.getSingle("index");
  const { results: latestPosts } = await client.getByType("blog_post", {
    pageSize: 3,
  });
  const slices = indexDoc.data.body;

  return {
    props: { slices, latestPosts },
  };
}
