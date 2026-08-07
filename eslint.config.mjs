import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".claude/**", "types.generated.ts"],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  {
    files: ["cypress/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        Cypress: "readonly",
        cy: "readonly",
        describe: "readonly",
        context: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
        expect: "readonly",
        assert: "readonly",
      },
    },
  },
];

export default config;
