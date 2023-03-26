import { Content } from "@prismicio/client";
import { asLink } from "@prismicio/helpers";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { GithubFill, LinkOut } from "akar-icons";
import React from "react";
import { H2, H4 } from "../utils/text";

export default function Projects({
  slice,
}: SliceComponentProps<Content.IndexDocumentDataBodyProjectsSlice>) {
  const { primary, items } = slice;

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-12 lg:px-0">
      <header className="mb-4">
        <H2>
          <PrismicRichText field={primary?.title} />
        </H2>
        <span className="text-gray-700 dark:text-gray-200">
          {!primary?.subtitle ? (
            ``
          ) : (
            <PrismicRichText field={primary?.subtitle} />
          )}
        </span>
      </header>

      <main className="grid gap-6 lg:grid-cols-2">
        {items.map((item, index) => (
          <article key={`project-${index}`}>
            <header className="mb-2">
              <span className="text-sm font-bold uppercase tracking-wide text-primary-700 dark:text-primary-500">
                {item.project_type}
              </span>
              <H4>
                <PrismicRichText field={item.project_title} />
              </H4>
            </header>

            <article className="prose prose-strong:text-gray-400 dark:text-gray-100">
              <PrismicRichText field={item.project_description} />
            </article>

            <section className="flex items-center justify-center gap-6">
              <a
                href={asLink(item.github_link) ?? ""}
                className="flex w-max items-center gap-2 rounded bg-gray-700 py-2 px-6 text-center text-base font-semibold text-white transition duration-300 hover:bg-gray-800"
              >
                GitHub
                <GithubFill size={20} />
              </a>

              <a
                href={asLink(item.link) ?? ""}
                className="flex w-max items-center gap-2 rounded bg-primary-700 py-2 px-6 text-center text-base font-semibold text-white transition duration-300 hover:bg-primary-800"
              >
                Live View
                <LinkOut size={20} />
              </a>
            </section>
          </article>
        ))}
      </main>
    </div>
  );
}
