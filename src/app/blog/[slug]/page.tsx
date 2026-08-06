import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ShareLinks from "~/components/ShareLinks";
import SocialmediaLinks from "~/components/SocialmediaLinks";
import { H1, H4, Paragraph } from "~/components/utils/text";
import { prismicClient } from "~/lib/prismic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  // Mejorar esto
  title: "Juan Alvarez | Blog",
};

export default async function BlogPost({ params }: Props) {
  const client = prismicClient();
  const { slug } = await params;

  if (!slug) notFound();

  const post = await client.getSingle("blog_post", {
    predicates: [prismic.filter.at("my.blog_post.slug", slug)],
  });

  const { data } = post;
  const { title, description, cover, content } = data;

  const currentUrl = "https://juanalvarez.dev";
  const link = `${currentUrl}/blog/${slug}`;

  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8">
      <header>
        <H1 className="mb-2">
          <PrismicText field={title} />
        </H1>

        <Paragraph className="mb-8">
          <PrismicText field={description} />
        </Paragraph>

        <figure className="relative -mx-4 mb-2 overflow-hidden shadow-md md:left-0 md:rounded-md lg:mx-0">
          <PrismicNextImage field={cover} fallbackAlt="" />
        </figure>
      </header>

      <main className="mb-6">
        <article className="prose-primary prose max-w-none hover:prose-a:underline dark:text-gray-100 dark:prose-headings:text-gray-100 dark:prose-a:text-primary-500 dark:prose-strong:text-primary-500 dark:prose-pre:bg-gray-700 dark:prose-pre:text-gray-100">
          <PrismicRichText field={content} />
        </article>
      </main>

      <ShareLinks url={link} title={prismic.asText(title)} />

      <footer className="my-8">
        <section className="flex gap-4">
          <figure className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
            <Image fill src="/images/me.jpg" alt="" />
          </figure>

          <article>
            <H4 className="mb-1">Juan Alvarez</H4>
            <Paragraph size="small" className="md:w-1/2">
              I’m a front-end developer from Venezuela. I do freelance work and
              create content about web development and JavaScript.
            </Paragraph>
            <SocialmediaLinks />
          </article>
        </section>
      </footer>
    </main>
  );
}
