import { asText } from "@prismicio/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import Footer from "~/components/Footer";
import GoTop from "~/components/GoTop";
import Navbar from "~/components/Navbar";
import { cn } from "~/lib/cn";
import { getIndex, getSettings } from "~/lib/prismic";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "~/lib/site";
import type { IndexDocumentDataBodyHeroaboutSlice } from "~/types.generated";
import "./global.css";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, indexDoc] = await Promise.all([
    getSettings().catch(() => null),
    getIndex().catch(() => null),
  ]);

  const slices = indexDoc ? [...indexDoc.data.body] : [];
  const hero = slices.find(
    (slice): slice is IndexDocumentDataBodyHeroaboutSlice =>
      slice.slice_type === "heroabout",
  );

  return {
    metadataBase: new URL(SITE_URL),
    title:
      settings?.data.meta_title ||
      (hero && asText(hero.primary.title)) ||
      SITE_NAME,
    description:
      settings?.data.meta_description ||
      (hero && asText(hero.primary.about)) ||
      SITE_DESCRIPTION,
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultTheme = (await cookies()).get("theme")?.value;

  return (
    <html lang="en" className={cn(defaultTheme === "dark" && "dark")}>
      <body>
        <Navbar defaultTheme={defaultTheme} />
        <main className="min-h-full flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
        <GoTop />
      </body>
    </html>
  );
}
