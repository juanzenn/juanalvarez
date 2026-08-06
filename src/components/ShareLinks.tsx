import React from "react";

const anchorClassName =
  "font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300";

export default function ShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const encodedUrl = encodeURIComponent(url);
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookShare = `https://www.facebook.com/share.php?u=${encodedUrl}`;

  return (
    <section className="my-8 flex flex-col items-center gap-4 lg:flex-row">
      <hr className="w-full text-gray-300 lg:w-2/3" />
      <article className="flex w-full justify-between gap-4 px-4 lg:w-1/3">
        <span className="uppercase text-gray-400">share</span>
        <section className="space-x-12 lg:space-x-4">
          <a
            className={anchorClassName}
            target="_blank"
            rel="noreferrer"
            href={linkedinShare}
            aria-label={`Share "${title}" on LinkedIn`}
          >
            LinkedIn
          </a>
          <a
            className={anchorClassName}
            target="_blank"
            rel="noreferrer"
            href={facebookShare}
            aria-label={`Share "${title}" on Facebook`}
          >
            Facebook
          </a>
        </section>
      </article>
    </section>
  );
}
