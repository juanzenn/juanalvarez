import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { ArrowRight } from "akar-icons";
import Link, { LinkProps } from "next/link";
import React from "react";
import { H3, Paragraph } from "./utils/text";

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
        <H3 className="text-primary-800 hover:underline dark:text-primary-500">
          <PrismicText field={title} />
        </H3>
      </LinkToPost>

      <Paragraph className="my-2">
        <PrismicText field={description} />
      </Paragraph>

      <LinkToPost
        href={postHref}
        className="ml-auto mt-auto flex w-fit items-center gap-2 rounded-md px-6 py-2 font-semibold text-gray-500 transition-colors hover:bg-gray-800/30 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-gray-200/30 dark:hover:text-gray-300"
      >
        Read more <ArrowRight size={20} />
      </LinkToPost>
    </div>
  );
}
