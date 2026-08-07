import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";
import { getSettings } from "~/lib/prismic";

const ICON_CLASSES = "h-6 w-6 text-gray-800 dark:text-gray-200";

export default async function ContactDetails() {
  const { data } = await getSettings();

  return (
    <ul className="space-y-4">
      {data.location ? (
        <ListItem icon={<MapPinIcon className={ICON_CLASSES} />}>
          <div>{data.location}</div>
        </ListItem>
      ) : null}

      {data.email ? (
        <ListItem icon={<EnvelopeIcon className={ICON_CLASSES} />}>
          <a
            href={`mailto:${data.email}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {data.email}
          </a>
        </ListItem>
      ) : null}

      {data.phone ? (
        <ListItem icon={<PhoneIcon className={ICON_CLASSES} />}>
          <a
            href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {data.phone}
          </a>
        </ListItem>
      ) : null}
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
