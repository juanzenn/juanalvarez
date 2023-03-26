import { BlogPostDocument } from "@/types.generated";
import { PrismicImage, PrismicText } from "@prismicio/react";
import Link from "next/link";
import React from "react";
import { Paragraph } from "../utils/text";

const BlogPost = ({ data }: BlogPostDocument) => {
  const { title, cover, slug, description } = data;
  const blogHref = `/blog/${slug}`;

  return (
    <article>
      <Link href={blogHref}>
        <PrismicImage
          field={cover}
          fallbackAlt=""
          className="mb-4 rounded-lg shadow-sm"
        />
      </Link>

      <Link href={blogHref}>
        <strong className="text-primary-800 hover:underline dark:text-primary-500">
          <PrismicText field={title} />
        </strong>
      </Link>

      <Paragraph size="small" className="mt-2">
        <PrismicText field={description} />
      </Paragraph>
    </article>
  );
};

export default function BlogPosts({ posts }: { posts: BlogPostDocument[] }) {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12">
      <h2 className="mb-6 text-4xl font-bold tracking-tight">Latest Blogs</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
