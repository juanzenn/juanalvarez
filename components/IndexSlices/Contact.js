import React from "react";

import { Envelope, GithubFill, LinkedInV1Fill, TwitterFill } from "akar-icons";

export default function Contact({ slice }) {
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
                <a key={`link-${index}`} href={item.contact_link.url}>
                  <TwitterFill
                    className="transition-all hover:text-primary-600"
                    size={36}
                  />
                </a>
              );
            case "Github":
              return (
                <a key={`link-${index}`} href={item.contact_link.url}>
                  <GithubFill
                    className="transition-all hover:text-primary-600"
                    size={36}
                  />
                </a>
              );
            case "Linkedin":
              return (
                <a key={`link-${index}`} href={item.contact_link.url}>
                  <LinkedInV1Fill
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
