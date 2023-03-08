import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { ArrowRight } from "akar-icons";
import Link, { LinkProps } from "next/link";
import React from "react";

function LinkToPost({
  children,
  href,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
} & LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export default function PostPreview({
  post,
}: {
  post: Content.BlogPostDocument["data"];
}) {
  const { cover, description, slug, title } = post;
  const postHref = `/blog/${slug}`;

  return (
    <div className="flex flex-col">
      <LinkToPost href={postHref}>
        <PrismicNextImage
          field={cover}
          className="mb-4 rounded-md shadow-sm"
          alt=""
        />
      </LinkToPost>

      <LinkToPost href={postHref}>
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-primary-900 hover:underline">
          <PrismicText field={title} />
        </h3>
      </LinkToPost>

      <p className="mb-6 leading-relaxed text-gray-600">
        <PrismicText field={description} />
      </p>

      <LinkToPost
        href={postHref}
        className="ml-auto flex w-fit items-center gap-2 rounded-md px-6 py-2 font-semibold text-gray-400 transition-all hover:bg-primary-100 hover:text-primary-600"
      >
        Read more <ArrowRight size={20} />
      </LinkToPost>
    </div>
  );
}
