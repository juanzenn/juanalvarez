import { SliceZone } from "@prismicio/react";
import React from "react";
import AboutMe from "~/components/IndexSlices/AboutMe";
import BlogPosts from "~/components/IndexSlices/BlogPosts";
import HeroAbout from "~/components/IndexSlices/HeroAbout";
import Projects from "~/components/IndexSlices/Projects";
import { prismicClient } from "~/lib/prismic";

export default async function RootPage() {
  const client = prismicClient();

  const indexDoc = await client.getSingle("index");
  const { results: latestPosts } = await client.getByType("blog_post", {
    pageSize: 3,
  });
  const slices = indexDoc.data.body;

  return (
    <>
      <HeroAbout />
      <AboutMe />
      {/* <Employment /> */}
      <SliceZone
        slices={slices}
        components={{
          heroabout: () => null,
          projects: Projects,
          contact: () => null,
        }}
      />
      <BlogPosts posts={latestPosts} />
    </>
  );
}
