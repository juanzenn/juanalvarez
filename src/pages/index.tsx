import createClient from "@/prismic";
import { SliceZone } from "@prismicio/react";
import { InferGetStaticPropsType, PreviewData } from "next";
import Head from "next/head";
import React from "react";
import AboutMe from "~/components/IndexSlices/AboutMe";
import BlogPosts from "~/components/IndexSlices/BlogPosts";
import HeroAbout from "~/components/IndexSlices/HeroAbout";
import Projects from "~/components/IndexSlices/Projects";
import Layout from "~/components/Layout";

export default function Home({
  slices,
  latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>
          Juan Alvarez | Fullstack Web Developer, freelancer, and writer.
        </title>
        <meta
          name="title"
          content="Juan Alvarez | Fullstack Web Developer, freelancer, and writer."
        />
        <meta
          name="description"
          content="I'm Juan, a fullstack web developer and freelancer, based in Venezuela. I build web applications and websites with quality in mind."
        />
      </Head>

      <Layout>
        <HeroAbout />
        <AboutMe />
        <SliceZone
          slices={slices}
          components={{
            heroabout: () => null,
            projects: Projects,
            contact: () => null,
          }}
        />
        <BlogPosts posts={latestPosts} />
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
