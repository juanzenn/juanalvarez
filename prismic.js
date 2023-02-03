import * as Prismic from "@prismicio/client";

const apiEndpoint = Prismic.getRepositoryEndpoint(process.env.API_ENDPOINT);

const client = Prismic.createClient(apiEndpoint);

export default client;
