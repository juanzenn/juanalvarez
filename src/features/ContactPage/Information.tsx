import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Information() {
  return (
    <div className="flex-1 text-gray-700 md:pr-2 lg:pr-4">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Get in touch</h1>

      <p className="prose-lg mb-6">
        Have a project in mind, or just want to say hi? Feel free to contact me.
        Use the form to send me an email, or use the information below to
        contact me directly.{" "}
        <b>I&apos;ll get back to you as soon as possible!</b>
      </p>

      <section className="my-6 w-fit space-x-6 text-gray-800">
        <a
          title="GitHub"
          href="https://github.com/juanzenn"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="h-6 w-6 cursor-pointer hover:text-primary-800"
            icon={faGithub}
          />
        </a>
        <a
          title="Twitter"
          href="https://twitter.com/Juanzenweb"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="h-6 w-6 cursor-pointer hover:text-primary-800"
            icon={faTwitter}
          />
        </a>
        <a
          title="Instagram"
          href="https://www.instagram.com/soyjuansin/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="h-6 w-6 cursor-pointer hover:text-primary-800"
            icon={faInstagram}
          />
        </a>
        <a
          title="Linkedin"
          href="https://www.linkedin.com/in/juan-alvarez11/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="h-6 w-6 cursor-pointer hover:text-primary-800"
            icon={faLinkedinIn}
          />
        </a>
      </section>

      <ul className="space-y-4">
        <ListItem icon={<MapPinIcon className="h-6 w-6 text-gray-800" />}>
          <div>Venezuela, Miranda</div>
        </ListItem>
        <ListItem icon={<EnvelopeIcon className="h-6 w-6 text-gray-800" />}>
          <a
            href="mailto:info@juanalvarez.dev"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            info@juanalvarez.dev
          </a>
        </ListItem>
        <ListItem icon={<PhoneIcon className="h-6 w-6 text-gray-800" />}>
          <a
            href="tel:+584142654031"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            +58 414-265 4031
          </a>
        </ListItem>
      </ul>
    </div>
  );
}

function ListItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-4">
      {icon}
      <span className="font-medium">{children}</span>
    </li>
  );
}
