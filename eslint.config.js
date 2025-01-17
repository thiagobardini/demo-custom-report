import eslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "test-results/",
      "playwright-report",
      "summary.json",
      "script/",
      "next-js/",
      "playwright.config.ts"
    ],
  },
  {
    files: ["**/*.ts"],
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
