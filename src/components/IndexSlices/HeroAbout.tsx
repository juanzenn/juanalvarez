import image1 from "@/public/images/banner (1).jpg";
import image2 from "@/public/images/banner (2).jpg";
import image3 from "@/public/images/banner (3).jpg";
import image4 from "@/public/images/banner (4).jpg";
import image5 from "@/public/images/banner (5).jpg";
import image6 from "@/public/images/banner (6).jpg";
import { asLink, asText } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image, { StaticImageData } from "next/image";
import { cn } from "~/lib/cn";
import type { IndexDocumentDataBodyHeroaboutSlice } from "~/types.generated";
import { H1, Paragraph } from "../utils/text";

export default function HeroAbout({
  slice,
}: SliceComponentProps<IndexDocumentDataBodyHeroaboutSlice>) {
  const { primary } = slice;
  const images = [image1, image2, image3, image4, image5, image6];
  const ctaLabel = asText(primary.cta_button_text);
  const ctaHref = asLink(primary.cta_button_url);

  return (
    <div className="min-h-[50vh] px-4 py-12">
      <section className="mx-auto mt-16 flex h-full max-w-[1080px] flex-col">
        <PrismicRichText
          field={primary.title}
          components={{
            heading1: ({ children }) => <H1 className="mb-4">{children}</H1>,
          }}
        />

        <PrismicRichText
          field={primary.about}
          components={{
            paragraph: ({ children }) => (
              <Paragraph className="text-xl md:w-1/2 lg:w-3/4">
                {children}
              </Paragraph>
            ),
          }}
        />

        {ctaLabel && ctaHref ? (
          <PrismicNextLink
            field={primary.cta_button_url}
            className="mt-6 block w-fit cursor-pointer rounded bg-primary-800 py-2 px-6 font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-primary-700"
          >
            {ctaLabel}
          </PrismicNextLink>
        ) : null}
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
      className={cn(
        "relative h-[50vh] w-[300px] overflow-hidden rounded-xl shadow-lg",
      )}
    >
      <Image
        alt=""
        src={image}
        placeholder="blur"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>
  );
}
