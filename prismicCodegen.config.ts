import type { Config } from "prismic-ts-codegen";

const config: Config = {
  output: "./src/types.generated.ts",
  repositoryName: process.env.API_ENDPOINT,
  customTypesAPIToken: process.env.PRISMIC_CUSTOM_TYPES_TOKEN,
  models: { fetchFromRepository: true },
};

export default config;
