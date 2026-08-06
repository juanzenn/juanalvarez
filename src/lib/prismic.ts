import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

const apiEndpoint = prismic.getRepositoryEndpoint(process.env.API_ENDPOINT!);

export const prismicClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(apiEndpoint, {
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
