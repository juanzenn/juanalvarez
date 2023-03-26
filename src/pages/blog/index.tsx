import createClient from "@/prismic";
import { InferGetStaticPropsType, PreviewData } from "next";
import Head from "next/head";
import Layout from "~/components/Layout";
import PostPreview from "~/components/PostPreview";
import { H1 } from "~/components/utils/text";

export default function Index({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blog - Juan Alvarez</title>
      </Head>

      <Layout>
        <section className="mx-auto mb-2 w-full max-w-[1080px] px-4">
          <header className="py-12">
            <H1>Blog</H1>
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
