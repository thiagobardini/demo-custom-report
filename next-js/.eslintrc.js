module.exports = {
  extends: ["custom"],
  globals: {
    NODE_ENV: "readonly"
  },
  env: {
    node: true
  },
  plugins: [
    'import'
  ],
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
    'import/named': 'error',
  },
};


// module.exports = {
//   // extends: ["eslint:recommended", "next"],
//   extends: ["custom"],

//   // extends: ["next", "next/core-web-vitals"],
// };


