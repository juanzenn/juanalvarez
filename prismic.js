import Prismic from '@prismicio/client';

const apiEndpoint = process.env.API_ENDPOINT;

const client = () => Prismic.client(apiEndpoint);

const Client = client();

export default Client;
