import createClient from "@/prismic";
import { InferGetStaticPropsType, PreviewData } from "next";
import Head from "next/head";
import Layout from "~/components/Layout";
import PostPreview from "~/components/PostPreview";

export default function Index({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blog - Juan Alvarez</title>
      </Head>

      <Layout>
        <section className="mb-2 w-full px-4">
          <header className="py-12">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-800">
              Blog
            </h1>
            <p className="prose prose-sm mb-6 text-gray-500">
              Personal notes from my thoughts
            </p>
          </header>

          <section className="mb-12 grid gap-6 md:grid-cols-2 lg:gap-12">
            {posts.map((post) => (
              <PostPreview post={post} key={post?.id} />
            ))}
          </section>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({
  previewData,
}: {
  previewData: PreviewData;
}) => {
  const client = createClient({ previewData });
  const posts = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  return {
    props: {
      posts: posts?.map((p) => ({ ...p.data, id: p.id })) ?? [],
    },
  };
};
