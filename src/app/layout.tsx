import type { Metadata } from "next";
import React from "react";
import "tailwindcss/tailwind.css";
import Footer from "~/components/Footer";
import GoTop from "~/components/GoTop";
import Navbar from "~/components/Navbar";
import "~/styles/global.css";

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
  return (
    <html lang="en" className="app-dir">
      <body>
        <Navbar />
        <main className="min-h-full flex-1">{children}</main>
        <Footer />
        <GoTop />
      </body>
    </html>
  );
}
