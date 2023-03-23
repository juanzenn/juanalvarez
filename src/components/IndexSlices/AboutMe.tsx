import mePicture from "@/public/images/me-big.jpg";
import Image from "next/image";
import React from "react";
import ContactDetails from "../ContactDetails";
import SocialmediaLinks from "../SocialmediaLinks";

export default function AboutMe() {
  return (
    <section className="mx-auto my-12 flex max-w-[1080px] flex-col-reverse gap-10 px-4 text-gray-900 md:flex-row lg:px-0">
      <article className="flex-[2] space-y-6">
        <h2 className=" text-3xl font-extrabold">
          I’m Juan Alvarez, a developer who loves the web and bringing ideas to
          life.
        </h2>
        <p className="prose-lg text-gray-800">
          I discovered web development in 2016, trying to build websites for fun
          in my free time. In 2020, due to the pandemic and college stoppage, I
          decided to take my development skills to the next level and started to
          learn about web development in depth.
        </p>
        <p className="prose-lg text-gray-800">
          I spent day and night learning to code with{" "}
          <ExternalLink href="https://react.dev/">React</ExternalLink> and{" "}
          <ExternalLink href="https://tc39.es/ecma262/">
            JavaScript
          </ExternalLink>{" "}
          and even wrote a few blog posts. I used Twitter to share my knowledge
          with the community. In September 2021, I found my first full-time job
          as a junior fullstack web developer.
        </p>
        <p className="prose-lg text-gray-800">
          Since then, I’ve worked on various projects, from company management
          systems to education platforms. The core programming languages I use
          are <ExternalLink href="https://www.php.net/">PHP</ExternalLink> and{" "}
          <ExternalLink href="https://tc39.es/ecma262/">
            JavaScript
          </ExternalLink>
          . In the frameworks department have experience with{" "}
          <ExternalLink href="https://react.dev/">React</ExternalLink>,{" "}
          <ExternalLink href="https://laravel.com/">Laravel</ExternalLink>, and{" "}
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>.
        </p>
        <p className="prose-lg text-gray-800">
          Even though my strong suit is on the frontend, I also work with
          backend technologies. I love to learn about databases, servers, and
          everything in between. Most of my projects use{" "}
          <ExternalLink href="https://www.mysql.com/">MySQL</ExternalLink> and{" "}
          <ExternalLink href="https://www.prisma.io/">Prisma</ExternalLink>.
        </p>
      </article>

      <aside className="flex flex-1 flex-col items-center">
        <figure className="relative block w-fit overflow-hidden rounded-full shadow-xl">
          <Image src={mePicture} alt="A picture of me" height={200} />
        </figure>

        <SocialmediaLinks />
        <div className="mb-6 h-1 w-1/2 border-t border-gray-300" />
        <ContactDetails />
      </aside>
    </section>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-primary-800 hover:underline"
    >
      {children}
    </a>
  );
}
