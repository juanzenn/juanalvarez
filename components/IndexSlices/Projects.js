import React from "react";

import { PrismicRichText } from "@prismicio/react";
import { GithubFill, LinkOut } from "akar-icons";

export default function Projects({ slice }) {
  const { primary, items } = slice;

  return (
    <div className="mx-auto px-4 py-12 lg:w-3/4">
      <header className="mb-4">
        <span className="text-4xl font-bold tracking-tight">
          <PrismicRichText field={primary.title} />
        </span>
        <span className="text-gray-600">
          {primary.subtitle.length == 0 ? (
            ``
          ) : (
            <PrismicRichText field={primary.subtitle} />
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
                href={item.github_link.url}
                className="flex w-max items-center gap-2 rounded bg-gray-700 py-2 px-6 text-center text-base font-semibold text-white transition duration-300 hover:bg-gray-800"
              >
                GitHub
                <GithubFill size={20} />
              </a>

              <a
                href={item.link.url}
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
