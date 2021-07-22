const Prismic = require('@prismicio/client');

const apiEndpoint = process.env.API_ENDPOINT;

export const Client = () => Prismic.client(apiEndpoint);

export default Client;
