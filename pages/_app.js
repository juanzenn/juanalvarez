import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import Script from "next/script";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider>
      <Script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=juan-alvarez"
      />

      <PrismicPreview repositoryName={process.env.API_ENDPOINT}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
