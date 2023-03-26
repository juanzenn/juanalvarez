import Head from "next/head";
import Image from "next/image";
import React from "react";
import Layout from "~/components/Layout";

import createClient from "@/prismic";
import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { GetStaticProps, InferGetStaticPropsType, PreviewData } from "next";
import SocialmediaLinks from "~/components/SocialmediaLinks";
import { H1, H4, Paragraph } from "~/components/utils/text";

export default function BlogPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = post;
  const { title, description, cover, slug, content } = data;

  const currentUrl = "https://juanalvarez.dev";
  const link = `${currentUrl}/blog/${slug}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${link}&text=${prismicH.asText(
    title
  )}`;
  const fbShare = `http://www.facebook.com/share.php?u=${link}`;

  return (
    <Layout>
      <Head>
        <title>{prismicH.asText(title)}</title>
        <meta
          name="description"
          content={prismicH.asText(description) ?? undefined}
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://juanalvarez.vercel.app/blog/${slug}`}
        />
        <meta
          property="og:title"
          content={prismicH.asText(title) ?? undefined}
        />
        <meta
          property="og:description"
          content={prismicH.asText(description) ?? undefined}
        />
        <meta property="og:image" content={cover?.src} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://juanalvarez.vercel.app/blog/${slug}`}
        />
        <meta
          property="twitter:title"
          content={prismicH.asText(title) ?? undefined}
        />
        <meta
          property="twitter:description"
          content={prismicH.asText(description) ?? undefined}
        />
        <meta property="twitter:image" content={cover?.src} />
      </Head>

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

        <section className="my-8 flex flex-col items-center gap-4 lg:flex-row">
          <hr className="w-full text-gray-300 lg:w-2/3" />
          <article className="flex w-full justify-between gap-4 px-4 lg:w-1/3">
            <span className="uppercase text-gray-400">share</span>
            <section className="space-x-12 lg:space-x-4">
              <a
                className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                target="_blank"
                rel="noreferrer"
                href={twitterShare}
              >
                Twitter
              </a>
              <a
                className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                target="_blank"
                rel="noreferrer"
                href={fbShare}
              >
                Facebook
              </a>
            </section>
          </article>
        </section>

        <footer className="my-8">
          <section className="flex gap-4">
            <figure className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
              <Image fill src="/images/me.jpg" alt="" />
            </figure>

            <article>
              <H4 className="mb-1">Juan Alvarez</H4>
              <Paragraph size="small" className="md:w-1/2">
                I’m a front-end developer from Venezuela. I do freelance work
                and create content about web development and JavaScript.
              </Paragraph>
              <SocialmediaLinks />
            </article>
          </section>
        </footer>
      </main>
    </Layout>
  );
}

export const getStaticPaths = async ({
  previewData,
}: {
  previewData: PreviewData;
}) => {
  const client = createClient({ previewData });
  const docs = await client.getAllByType("blog_post");
  const paths = docs.map((doc) => {
    return {
      params: {
        slug: doc.data.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createClient();

  const { slug } = params ?? {};

  if (!slug)
    return {
      notFound: true,
    };

  const post = await client.getSingle("blog_post", {
    predicates: [prismic.predicate.at("my.blog_post.slug", slug)],
  });

  return {
    props: {
      post,
    },
  };
};
