import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { asLink } from "@prismicio/client";
import React from "react";
import { getSettings } from "~/lib/prismic";

const PLATFORMS = {
  github: { icon: faGithub, title: "GitHub" },
  linkedin: { icon: faLinkedinIn, title: "Linkedin" },
} as const;

export default async function SocialmediaLinks() {
  const settings = await getSettings();

  return (
    <section className="my-6 w-fit space-x-6 text-gray-800 dark:text-gray-200 flex">
      {settings.data.socials.map((social, index) => {
        const platform = social.platform && PLATFORMS[social.platform];
        const href = asLink(social.url);

        if (!platform || !href) return null;

        return (
          <a
            key={index}
            title={platform.title}
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              className="h-6 w-6 cursor-pointer hover:text-primary-800 dark:hover:text-primary-500"
              icon={platform.icon}
            />
          </a>
        );
      })}
    </section>
  );
}
