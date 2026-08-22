import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { cn } from "~/lib/cn";
import { FOCUS_RING } from "~/lib/focus-ring";
import { H3, Paragraph } from "./utils/text";

export default function PostPreview({
  post,
}: {
  post: Content.BlogPostDocument["data"];
}) {
  const { cover, description, slug, title } = post;
  const postHref = `/blog/${slug}`;

  return (
    <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-700">
      {isFilled.image(cover) && (
        <Link
          href={postHref}
          tabIndex={-1}
          aria-hidden
          className="mb-4 block rounded-md"
        >
          <PrismicNextImage
            field={cover}
            alt=""
            className="h-auto w-full rounded-md"
          />
        </Link>
      )}

      <H3>
        <Link
          href={postHref}
          className={cn(
            "rounded text-primary-800 hover:underline dark:text-primary-400",
            FOCUS_RING
          )}
        >
          <PrismicText field={title} />
        </Link>
      </H3>

      <Paragraph className="mb-6 mt-2">
        <PrismicText field={description} />
      </Paragraph>

      <Link
        href={postHref}
        className={cn(
          "mt-auto flex w-fit items-center gap-2 rounded text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200",
          FOCUS_RING
        )}
      >
        Read more <ArrowRightIcon className="h-[18px] w-[18px]" />
      </Link>
    </article>
  );
}
