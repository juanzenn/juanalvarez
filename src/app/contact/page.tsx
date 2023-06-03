import { Metadata } from "next";
import React from "react";
import ContactForm from "~/components/features/ContactPage/ContactForm";
import Information from "~/components/features/ContactPage/Information";

export const metadata: Metadata = {
  title: "Juan Alvarez | Contact",
};

export default function ContactPage() {
  return (
    <section className="mx-auto flex max-w-[1080px] flex-col gap-12 px-8 py-8 md:flex-row lg:py-28 lg:px-0">
      <Information />
      <ContactForm />
    </section>
  );
}
