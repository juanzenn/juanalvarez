import { PrismicImage, PrismicText } from "@prismicio/react";
import Link from "next/link";
import React from "react";
import { BlogPostDocument } from "../../types.generated";

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
        <strong className="text-primary-900 hover:underline">
          <PrismicText field={title} />
        </strong>
      </Link>

      <p className="prose-sm mt-2 text-gray-600">
        <PrismicText field={description} />
      </p>
    </article>
  );
};

export default function BlogPosts({ posts }: { posts: BlogPostDocument[] }) {
  return (
    <section className="mx-auto px-4 py-12 lg:w-10/12">
      <h2 className="mb-6 text-4xl font-bold tracking-tight">Latest Blogs</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
