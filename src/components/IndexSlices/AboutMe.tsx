import mePicture from "@/public/images/me-big.jpg";
import { asLink } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import React from "react";
import type { IndexDocumentDataBodyAboutMeSlice } from "~/types.generated";
import ContactDetails from "../ContactDetails";
import SocialmediaLinks from "../SocialmediaLinks";
import { H2, Paragraph } from "../utils/text";

export default function AboutMe({
  slice,
}: SliceComponentProps<IndexDocumentDataBodyAboutMeSlice>) {
  const { primary } = slice;

  return (
    <section className="mx-auto my-12 flex max-w-[1080px] flex-col-reverse gap-10 px-4 md:flex-row lg:px-0">
      <article className="flex-2 space-y-6">
        <PrismicRichText
          field={primary.heading}
          components={{
            heading2: ({ children }) => <H2>{children}</H2>,
          }}
        />

        <PrismicRichText
          field={primary.content}
          components={{
            paragraph: ({ children }) => <Paragraph>{children}</Paragraph>,
            hyperlink: ({ node, children }) => (
              <ExternalLink href={asLink(node.data) ?? ""}>
                {children}
              </ExternalLink>
            ),
          }}
        />
      </article>

      <aside className="flex flex-1 flex-col items-center">
        <figure className="relative block w-fit overflow-hidden rounded-full shadow-xl">
          <Image src={mePicture} alt="A picture of me" height={200} />
        </figure>
        <SocialmediaLinks />

        <div className="mb-6 h-1 w-1/2 border-t border-gray-300" />

        <ContactDetails />
      </aside>
    </section>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-primary-800 hover:underline dark:text-primary-500"
    >
      {children}
    </a>
  );
}
