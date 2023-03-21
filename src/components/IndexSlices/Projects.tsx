import { Content } from "@prismicio/client";
import { asLink } from "@prismicio/helpers";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { GithubFill, LinkOut } from "akar-icons";
import React from "react";

export default function Projects({
  slice,
}: SliceComponentProps<Content.IndexDocumentDataBodyProjectsSlice>) {
  const { primary, items } = slice;

  return (
    <div className="mx-auto px-4 py-12 lg:w-10/12">
      <header className="mb-4">
        <span className="text-4xl font-bold tracking-tight">
          <PrismicRichText field={primary?.title} />
        </span>
        <span className="text-gray-600">
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
              <span className="text-sm font-bold uppercase tracking-wide text-primary-700">
                {item.project_type}
              </span>
              <span className="text-2xl font-bold tracking-tight">
                <PrismicRichText field={item.project_title} />
              </span>
            </header>

            <article className="prose mb-4">
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
