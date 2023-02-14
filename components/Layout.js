import React from "react";
import Footer from "./Footer";
import GoTop from "./GoTop";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-full">{children}</main>
      <Footer />
      <GoTop />
    </>
  );
}
