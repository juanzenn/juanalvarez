import { SliceZone } from "@prismicio/react";
import AboutMe from "~/components/IndexSlices/AboutMe";
import BlogPosts from "~/components/IndexSlices/BlogPosts";
import Employment from "~/components/IndexSlices/Employment";
import HeroAbout from "~/components/IndexSlices/HeroAbout";
import Projects from "~/components/IndexSlices/Projects";
import { getIndex } from "~/lib/prismic";

const components = {
  heroabout: HeroAbout,
  about_me: AboutMe,
  projects: Projects,
  blog_posts: BlogPosts,
};

export default async function RootPage() {
  const indexDoc = await getIndex();

  const slices = [...indexDoc.data.body];
  const aboutMeIndex = slices.findIndex(
    (slice) => slice.slice_type === "about_me",
  );
  const splitAt = aboutMeIndex === -1 ? slices.length : aboutMeIndex + 1;

  return (
    <>
      <SliceZone slices={slices.slice(0, splitAt)} components={components} />

      <Employment />

      <SliceZone slices={slices.slice(splitAt)} components={components} />
    </>
  );
}
