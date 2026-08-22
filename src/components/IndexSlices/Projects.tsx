import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { asLink, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FOCUS_RING } from "~/lib/focus-ring";
import type { IndexDocumentDataBodyProjectsSlice } from "~/types.generated";
import { H2, H3 } from "../utils/text";

export default function Projects({
  slice,
}: SliceComponentProps<IndexDocumentDataBodyProjectsSlice>) {
  const { primary, items } = slice;

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-12 lg:px-0">
      <header className="mb-4">
        <PrismicRichText
          field={primary?.title}
          components={{
            heading2: ({ children }) => <H2>{children}</H2>,
          }}
        />
        <span className="text-gray-700 dark:text-gray-200">
          {!primary?.subtitle ? (
            ``
          ) : (
            <PrismicRichText field={primary?.subtitle} />
          )}
        </span>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const liveHref = asLink(item.link);
          const githubHref = asLink(item.github_link);
          const [intro] = item.project_description;
          const title = asText(item.project_title);

          return (
            <article
              key={`project-${index}`}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-600 dark:bg-gray-700"
            >
              <header className="mb-3">
                {item.project_type && (
                  <span className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                    {item.project_type}
                  </span>
                )}

                <PrismicRichText
                  field={item.project_title}
                  components={{
                    heading3: ({ children }) => (
                      <H3 className="mt-2">
                        {liveHref ? (
                          <a
                            href={liveHref}
                            className={`rounded transition-colors hover:text-primary-700 dark:hover:text-primary-300 ${FOCUS_RING}`}
                          >
                            {children}
                          </a>
                        ) : (
                          children
                        )}
                      </H3>
                    ),
                  }}
                />
              </header>

              {intro && (
                <PrismicRichText
                  field={[intro]}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="mb-6 text-gray-600 dark:text-gray-200">
                        {children}
                      </p>
                    ),
                  }}
                />
              )}

              <footer className="mt-auto flex items-center gap-3">
                {liveHref && (
                  <a
                    href={liveHref}
                    className={`flex items-center gap-2 rounded bg-primary-700 py-2 px-4 text-sm font-semibold text-white transition duration-300 hover:bg-primary-800 ${FOCUS_RING}`}
                  >
                    Live View
                    <ArrowTopRightOnSquareIcon className="h-[18px] w-[18px]" />
                  </a>
                )}

                {githubHref && (
                  <a
                    href={githubHref}
                    aria-label={`${title} on GitHub`}
                    className={`flex items-center rounded border border-gray-300 p-2 text-gray-700 transition duration-300 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-100 dark:hover:bg-gray-600 ${FOCUS_RING}`}
                  >
                    <FontAwesomeIcon className="h-[18px] w-[18px]" icon={faGithub} />
                  </a>
                )}
              </footer>
            </article>
          );
        })}
      </section>
    </div>
  );
}
