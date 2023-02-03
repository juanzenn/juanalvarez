import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";

const apiEndpoint = prismic.getRepositoryEndpoint(process.env.API_ENDPOINT);

const createClient = (config = {}) => {
  const client = prismic.createClient(apiEndpoint, config);

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

export default createClient;
