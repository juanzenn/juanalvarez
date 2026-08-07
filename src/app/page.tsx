import { SliceZone } from "@prismicio/react";
import AboutMe from "~/components/IndexSlices/AboutMe";
import BlogPosts from "~/components/IndexSlices/BlogPosts";
import HeroAbout from "~/components/IndexSlices/HeroAbout";
import Projects from "~/components/IndexSlices/Projects";
import { getIndex } from "~/lib/prismic";

export default async function RootPage() {
  const indexDoc = await getIndex();

  return (
    <>
      {/* <Employment /> */}
      <SliceZone
        slices={indexDoc.data.body}
        components={{
          heroabout: HeroAbout,
          about_me: AboutMe,
          projects: Projects,
          blog_posts: BlogPosts,
        }}
      />
    </>
  );
}
