import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

const apiEndpoint = prismic.getRepositoryEndpoint(process.env.API_ENDPOINT!);

export const prismicClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(apiEndpoint, {
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? {
            next: { tags: ["prismic"], revalidate: 3600 },
            cache: "force-cache",
          }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};
