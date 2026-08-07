import { defineConfig } from "cypress";

module.exports = defineConfig({
  projectId: "1fxcd6",
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
