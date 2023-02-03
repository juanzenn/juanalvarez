import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { ArrowRight } from "akar-icons";
import Link from "next/link";
import React from "react";

function LinkToPost({ children, href, ...rest }) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export default function PostPreview({ post }) {
  console.log(post);
  const { cover, description, slug, title } = post;
  const postHref = `/blog/${slug}`;

  return (
    <div className="flex flex-col">
      <LinkToPost href={postHref}>
        <PrismicNextImage field={cover} className="rounded-md mb-4 shadow-sm" />
      </LinkToPost>

      <LinkToPost href={postHref}>
        <h3 className="font-bold tracking-tight text-2xl mb-1 text-primary-900 hover:underline">
          <PrismicText field={title} />
        </h3>
      </LinkToPost>

      <p className="text-gray-600 leading-relaxed mb-6">
        <PrismicRichText field={description} />
      </p>

      <LinkToPost
        href={postHref}
        className="w-fit flex gap-2 w-max items-center hover:text-primary-600 hover:bg-primary-100 px-6 py-2 rounded-md text-gray-400 transition-all ml-auto font-semibold"
      >
        Read more <ArrowRight size={20} />
      </LinkToPost>
    </div>
  );
}
