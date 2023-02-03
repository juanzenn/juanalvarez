import { PrismicProvider } from "@prismicio/react";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <PrismicProvider>
      <Component {...pageProps} />
    </PrismicProvider>
  );
}

export default MyApp;
