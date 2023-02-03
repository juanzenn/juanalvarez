import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider>
      <PrismicPreview repositoryName={PROCESS.env.API_ENDPOINT}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
