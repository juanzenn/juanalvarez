import image1 from "@/public/images/banner (1).jpg";
import image2 from "@/public/images/banner (2).jpg";
import image3 from "@/public/images/banner (3).jpg";
import image4 from "@/public/images/banner (4).jpg";
import image5 from "@/public/images/banner (5).jpg";
import image6 from "@/public/images/banner (6).jpg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { clsx } from "~/utils/clsx";

export default function HeroAbout() {
  const images = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="min-h-[50vh] px-4 py-12">
      <section className="mt-16 flex h-full flex-col">
        <h1 className="mb-6 text-4xl font-bold tracking-tighter text-gray-900 lg:text-5xl">
          Fullstack web developer, freelancer, <br />
          and technical writer.
        </h1>

        <p className="text-lg text-gray-700 md:w-1/2 lg:w-3/4 lg:text-xl">
          I’m Juan, a fullstack web developer and freelancer, based in
          Venezuela. I build web applications and websites with quality in mind.
        </p>

        <Link
          href="/contact"
          className="mt-6 block w-fit cursor-pointer rounded bg-primary-800 py-2 px-6 font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-primary-700"
        >
          LET’S WORK TOGETHER
        </Link>
      </section>

      <figure className="relative -mx-4 mt-12 h-[300px] md:hidden">
        <Image alt="" src="/images/horizontal-banner.jpg" fill />
      </figure>

      <div className="absolute left-0 my-16 hidden w-full overflow-hidden md:block">
        <section className="flex w-fit gap-9">
          {images.map((image, index) => (
            <FigureComponent key={index} image={image} />
          ))}
          {images.map((image, index) => (
            <FigureComponent key={index} image={image} />
          ))}
        </section>
      </div>

      <div className="hidden h-[540px] md:block" />
    </div>
  );
}

function FigureComponent({ image }: { image: StaticImageData }) {
  return (
    <figure
      className={clsx(
        "relative h-[50vh] w-[300px] overflow-hidden rounded-xl shadow-lg"
      )}
    >
      <Image alt="" src={image} placeholder="blur" fill />
    </figure>
  );
}
