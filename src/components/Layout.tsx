import React from "react";
import Footer from "./Footer";
import GoTop from "./GoTop";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-full max-w-[1080px] flex-1">
        {children}
      </main>
      <Footer />
      <GoTop />
    </>
  );
}
