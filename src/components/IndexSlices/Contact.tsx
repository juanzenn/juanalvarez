import React from "react";

import { Content, asLink } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Envelope, GithubFill, LinkedinFill, TwitterFill } from "akar-icons";

export default function Contact({
  slice,
}: {
  slice: SliceComponentProps<Content.IndexDocumentDataBodyContactSlice>["slice"];
}) {
  const { items } = slice;

  return (
    <>
      <hr className="my-4 mx-auto w-10/12 text-gray-400" />

      <div className="flex justify-center gap-4 pb-12">
        {items.map((item, index) => {
          switch (item.contact_label) {
            case "Mail":
              return (
                <a
                  key={`link-${index}`}
                  href="mailto:alvarezdasilvaj@gmail.com"
                >
                  <Envelope
                    className="transition-all hover:text-primary-600"
                    size={36}
                  />
                </a>
              );
            case "Twitter":
              return (
                <a key={`link-${index}`} href={asLink(item.contact_link) ?? ""}>
                  <TwitterFill
                    className="transition-all hover:text-primary-600"
                    size={36}
                  />
                </a>
              );
            case "Github":
              return (
                <a key={`link-${index}`} href={asLink(item.contact_link) ?? ""}>
                  <GithubFill
                    className="transition-all hover:text-primary-600"
                    size={36}
                  />
                </a>
              );
            case "Linkedin":
              return (
                <a key={`link-${index}`} href={asLink(item.contact_link) ?? ""}>
                  <LinkedinFill
                    className="transition-all hover:text-primary-600"
                    size={36}
                  />
                </a>
              );
          }
        })}
      </div>
    </>
  );
}
