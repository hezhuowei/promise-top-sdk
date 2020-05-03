module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: ["@typescript-eslint"],
  rules: {}
};
