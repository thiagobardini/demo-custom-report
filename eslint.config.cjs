const eslintPlugin = require("@typescript-eslint/eslint-plugin");
const eslintParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "test-results/",
      "playwright-report",
      "summary.json",
      "script/",
      "next-js/"
    ],
  },
  {
    files: ["**/*.ts", "playwright.config.ts"], 
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": ["error"],
      "prettier/prettier": "error",
    },
  },
];
