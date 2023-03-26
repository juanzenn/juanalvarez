import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function ContactDetails() {
  return (
    <ul className="space-y-4">
      <ListItem
        icon={
          <MapPinIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        }
      >
        <div>Venezuela, Miranda</div>
      </ListItem>
      <ListItem
        icon={
          <EnvelopeIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        }
      >
        <a
          href="mailto:info@juanalvarez.dev"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          info@juanalvarez.dev
        </a>
      </ListItem>
      <ListItem
        icon={
          <PhoneIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        }
      >
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
