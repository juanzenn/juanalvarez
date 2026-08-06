import type { Metadata } from "next";

type OpenGraphImage = NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
>;

export const SITE_URL = "https://juanalvarez.dev";

export const SITE_NAME = "Juan Alvarez";

export const SITE_DESCRIPTION =
  "I'm Juan, a fullstack web developer and freelancer, based in Venezuela. I build web applications and websites with quality in mind.";

export const DEFAULT_OG_IMAGE = {
  url: "/cover.png",
  width: 1200,
  height: 680,
  alt: "Juan Alvarez, fullstack web developer",
} satisfies OpenGraphImage;
