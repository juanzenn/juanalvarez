import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { AppProps } from "next/app";
import Script from "next/script";
import "tailwindcss/tailwind.css";
import "~/styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider>
      <Script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=juan-alvarez"
      />

      <PrismicPreview repositoryName={process.env.API_ENDPOINT!}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
