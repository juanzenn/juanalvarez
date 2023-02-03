import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

import Prismic from "@prismicio/client";
import { ArrowRight } from "akar-icons";
import { RichText } from "prismic-reactjs";
import PostPreview from "../../components/PostPreview";
import client from "../../prismic";

export default function Index({ posts }) {
  console.log(posts);

  return (
    <>
      <Head>
        <title>All Blog Posts - Juan Alvarez</title>
      </Head>

      <Layout>
        <section className="px-4 mx-auto w-full lg:w-9/12 mb-2">
          <header className="py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Blog Posts
            </h1>
            <p className="prose prose-sm mb-6">
              My notes on JavaScript, web development or my personal life and
              projects.
            </p>
          </header>

          <section className="mb-12 grid md:grid-cols-2 gap-6 lg:gap-12">
            {posts.map((post) => (
              <PostPreview post={post} key={post?.id} />
            ))}
          </section>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.last_publication_date",
      order: "desc",
    },
  });

  return {
    props: {
      posts: posts?.map((p) => p.data) ?? [],
    },
  };
};
