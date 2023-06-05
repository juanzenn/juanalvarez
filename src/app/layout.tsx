import type { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import Footer from "~/components/Footer";
import GoTop from "~/components/GoTop";
import Navbar from "~/components/Navbar";
import { cn } from "~/lib/cn";
import "./global.css";

export const metadata: Metadata = {
  title: "Juan Alvarez | Fullstack Web Developer, freelancer, and writer.",
  description:
    "I'm Juan, a fullstack web developer and freelancer, based in Venezuela. I build web applications and websites with quality in mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultTheme = cookies().get("theme")?.value;

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
