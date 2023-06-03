import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

const apiEndpoint = prismic.getRepositoryEndpoint(process.env.API_ENDPOINT!);

export const prismicClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(apiEndpoint, config);

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
