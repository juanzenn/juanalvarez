import Head from "next/head";
import React from "react";
import Layout from "~/components/Layout";
import ContactForm from "~/features/ContactPage/ContactForm";
import Information from "~/features/ContactPage/Information";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Juan Alvarez - Contact</title>
      </Head>

      <Layout>
        <section className="mx-auto flex max-w-[1080px] flex-col gap-12 px-8 py-8 md:flex-row lg:py-28 lg:px-0">
          <Information />
          <ContactForm />
        </section>
      </Layout>
    </>
  );
}
