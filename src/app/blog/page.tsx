import { Metadata } from "next";
import PostPreview from "~/components/PostPreview";
import { H1 } from "~/components/utils/text";
import { prismicClient } from "~/lib/prismic";

export const metadata: Metadata = {
  title: "Juan Alvarez | Blog",
};

export default async function Index() {
  const client = prismicClient();
  const res = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  const posts = res?.map((p) => ({ ...p.data, id: p.id }));

  return (
    <section className="mx-auto mb-2 w-full max-w-[1080px] px-4">
      <header className="py-12">
        <H1>Blog</H1>
      </header>

      <section className="mb-12 grid gap-6 md:grid-cols-2 lg:gap-12">
        {posts?.map((post) => (
          <PostPreview post={post} key={post?.id} />
        ))}
      </section>
    </section>
  );
}
