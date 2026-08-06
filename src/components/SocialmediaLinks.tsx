import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SocialmediaLinks() {
  return (
    <section className="my-6 w-fit space-x-6 text-gray-800 dark:text-gray-200 flex">
      <a
        title="GitHub"
        href="https://github.com/juanzenn"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon
          className="h-6 w-6 cursor-pointer hover:text-primary-800 dark:hover:text-primary-500"
          icon={faGithub}
        />
      </a>
      <a
        title="Linkedin"
        href="https://www.linkedin.com/in/alvarezjads/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon
          className="h-6 w-6 cursor-pointer hover:text-primary-800 dark:hover:text-primary-500"
          icon={faLinkedinIn}
        />
      </a>
    </section>
  );
}
