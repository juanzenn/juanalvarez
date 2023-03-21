import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import React from "react";

export default function HeroAbout({
  slice,
}: SliceComponentProps<Content.IndexDocumentDataBodyHeroaboutSlice>) {
  return (
    <div className="relative h-screen items-start overflow-hidden px-4 py-12 text-center lg:items-center">
      <section className="mx-auto flex h-full flex-col justify-center md:h-3/4 lg:w-3/4">
        <h1 className="mb-2 text-6xl font-bold tracking-tighter text-primary-900 lg:text-7xl">
          <PrismicText field={slice.primary.title} />
        </h1>

        <p className="w-full text-lg font-medium text-gray-600">
          <PrismicText field={slice.primary.about} />
        </p>

        <p className="mx-auto mt-6 cursor-pointer rounded bg-primary-900 py-2 px-6 font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-primary-800">
          LET’S BUILD TOGETHER
        </p>
      </section>

      <motion.div
        className="hero-decoration"
        initial={{ opacity: 0, scale: 0, x: "-50%" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          duration: 1,
        }}
      />
    </div>
  );
}