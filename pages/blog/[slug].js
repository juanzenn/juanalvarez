import Head from "next/head";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";

import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { GithubFill, LinkedInV1Fill, TwitterFill } from "akar-icons";
import createClient from "../../prismic";

export default function BlogPost({ post }) {
  const { data } = post;
  const { title, description, cover, slug, content } = data;

  return (
    <Layout>
      <Head>
        <title>{prismicH.asText(title)}</title>
        <meta name="description" content={prismicH.asText(description)} />

        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://juanalvarez.vercel.app/blog/${slug}`}
        />
        <meta property="og:title" content={prismicH.asText(title)} />
        <meta
          property="og:description"
          content={prismicH.asText(description)}
        />
        <meta property="og:image" content={cover?.src} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://juanalvarez.vercel.app/blog/${slug}`}
        />
        <meta property="twitter:title" content={prismicH.asText(title)} />
        <meta
          property="twitter:description"
          content={prismicH.asText(description)}
        />
        <meta property="twitter:image" content={cover?.src} />
      </Head>

      <main className="mx-auto w-screen px-4 py-8 lg:w-7/12">
        <header>
          <article className="mb-2 text-4xl font-bold tracking-tighter">
            <PrismicText field={title} />
          </article>

          <article className="prose mb-8 text-gray-600">
            <PrismicText field={description} />
          </article>

          <figure className="relative mb-8 w-screen overflow-hidden rounded-md shadow-md md:left-0 md:w-full">
            <PrismicNextImage field={cover} alt={prismicH.asText(title)} />
          </figure>
        </header>

        <main className="mb-6">
          <article className="prose-primary prose max-w-none">
            <PrismicRichText field={content} />
          </article>
        </main>

        <section className="my-8 flex flex-col items-center gap-4 lg:flex-row">
          <hr className="w-full text-gray-300 lg:w-2/3" />
          <article className="flex w-full justify-between gap-4 px-4 lg:w-1/3">
            <span className="uppercase text-gray-400">share</span>
            <section className="space-x-12 lg:space-x-4">
              <a
                className="font-semibold text-primary-600 transition-colors hover:text-primary-700 "
                href="#"
              >
                Twitter
              </a>
              <a
                className="font-semibold text-primary-600 transition-colors hover:text-primary-700 "
                href="#"
              >
                Facebook
              </a>
            </section>
          </article>
        </section>

        <footer className="my-8">
          <section className="flex items-center gap-4">
            <figure className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
              <Image fill src="/me.jpg" alt="" />
            </figure>

            <article>
              <strong className="mb-1 text-sm lg:text-base">
                Juan Alvarez
              </strong>
              <p className="prose prose-sm mb-4">
                I’m a front-end developer from Venezuela. I do freelance work
                and create content about web development and JavaScript.
              </p>
              <section className="flex gap-4">
                <a
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  href="https://twitter.com/juanzenweb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterFill />
                </a>
                <a
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  href="https://linkedin.com/in/juan-alvarez11/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInV1Fill />
                </a>
                <a
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  href="https://github.com/juanzenn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubFill />
                </a>
              </section>
            </article>
          </section>
        </footer>
      </main>
    </Layout>
  );
}

export const getStaticPaths = async ({ previewData }) => {
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

export const getStaticProps = async ({ params }) => {
  const client = createClient();

  const { slug } = params;

  const post = await client.getSingle("blog_post", {
    predicates: [prismic.predicate.at("my.blog_post.slug", slug)],
  });

  return {
    props: {
      post,
    },
  };
};
