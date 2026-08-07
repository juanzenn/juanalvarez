import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { prismicClient } from "~/lib/prismic";
import type { IndexDocumentDataBodyBlogPostsSlice } from "~/types.generated";
import PostPreview from "../PostPreview";
import { H2, Paragraph } from "../utils/text";

export default async function BlogPosts({
  slice,
}: SliceComponentProps<IndexDocumentDataBodyBlogPostsSlice>) {
  const { primary } = slice;

  const { results: posts } = await prismicClient().getByType("blog_post", {
    pageSize: 3,
    orderings: {
      direction: "desc",
      field: "document.first_publication_date",
    },
  });

  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12">
      <header className="mb-6">
        <PrismicRichText
          field={primary.title}
          components={{
            heading2: ({ children }) => <H2>{children}</H2>,
          }}
        />
        <PrismicRichText
          field={primary.subtitle}
          components={{
            paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
          }}
        />
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post.data} />
        ))}
      </div>
    </section>
  );
}
