import * as prismicH from "@prismicio/helpers";
import { PrismicImage, PrismicText } from "@prismicio/react";
import Link from "next/link";
import React from "react";

const BlogPost = ({ data }) => {
  const { title, cover, slug, description } = data;
  const blogHref = `/blog/${slug}`;

  return (
    <article>
      <Link href={blogHref}>
        <PrismicImage
          field={cover}
          alt={prismicH.asText(title)}
          className="rounded-lg shadow-sm mb-4"
        />
      </Link>

      <Link href={blogHref}>
        <strong className="text-primary-900 hover:underline">
          <PrismicText field={title} />
        </strong>
      </Link>

      <p className="text-gray-600 mt-2 prose-sm">
        <PrismicText field={description} />
      </p>
    </article>
  );
};

export default function BlogPosts({ posts }) {
  return (
    <section className="px-4 py-12 lg:w-3/4 mx-auto">
      <h2 className="text-4xl font-bold tracking-tight mb-6">Latest Blogs</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPost key={post.id} data={post?.data} />
        ))}
      </div>
    </section>
  );
}
