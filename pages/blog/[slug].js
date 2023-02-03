import Head from "next/head";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";

import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { GithubFill, LinkedInV1Fill, TwitterFill } from "akar-icons";
import Client from "../../prismic";

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

      <main className="w-screen lg:w-7/12 px-4 mx-auto py-8">
        <header>
          <article className="text-4xl font-bold tracking-tighter mb-2">
            <PrismicText field={title} />
          </article>

          <article className="text-gray-600 prose mb-8">
            <PrismicText field={description} />
          </article>

          <figure className="relative w-screen md:w-full md:left-0 mb-8 rounded-md shadow-md overflow-hidden">
            <PrismicNextImage field={cover} alt={prismicH.asText(title)} />
          </figure>
        </header>

        <main className="mb-6">
          <article className="prose prose-primary max-w-none">
            <PrismicRichText field={content} />
          </article>
        </main>

        <section className="flex flex-col lg:flex-row gap-4 items-center my-8">
          <hr className="w-full lg:w-2/3 text-gray-300" />
          <article className="w-full lg:w-1/3 flex justify-between gap-4 px-4">
            <span className="uppercase text-gray-400">share</span>
            <section className="space-x-12 lg:space-x-4">
              <a
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors "
                href="#"
              >
                Twitter
              </a>
              <a
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors "
                href="#"
              >
                Facebook
              </a>
            </section>
          </article>
        </section>

        <footer className="my-8">
          <section className="flex gap-4 items-center">
            <figure className="h-24 w-24 relative overflow-hidden flex-shrink-0 rounded-full">
              <Image fill src="/me.jpg" />
            </figure>

            <article>
              <strong className="text-sm lg:text-base mb-1">
                Juan Alvarez
              </strong>
              <p className="prose prose-sm mb-4">
                I’m a front-end developer from Venezuela. I do freelance work
                and create content about web development and JavaScript.
              </p>
              <section className="flex gap-4">
                <a
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  href="https://twitter.com/juanzenweb"
                  target="_blank"
                >
                  <TwitterFill />
                </a>
                <a
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  href="https://linkedin.com/in/juan-alvarez11/"
                  target="_blank"
                >
                  <LinkedInV1Fill />
                </a>
                <a
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  href="https://github.com/juanzenn"
                  target="_blank"
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

export const getStaticPaths = async () => {
  const docs = await Client.getAllByType("blog_post");
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
  const { slug } = params;

  const post = await Client.getSingle("blog_post", {
    predicates: [prismic.predicate.at("my.blog_post.slug", slug)],
  });

  return {
    props: {
      post,
    },
  };
};
