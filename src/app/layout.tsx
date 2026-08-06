import type { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import Footer from "~/components/Footer";
import GoTop from "~/components/GoTop";
import Navbar from "~/components/Navbar";
import { cn } from "~/lib/cn";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "~/lib/site";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Juan Alvarez | Fullstack Web Developer, freelancer, and writer.",
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
  },
};

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
        <GoTop />
      </body>
    </html>
  );
}
