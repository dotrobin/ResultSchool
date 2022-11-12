module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", "tab"],
    semi: [2, "always"],
    "space-before-function-paren": [
      "error", 
      {anonymous: "always", named: "never"}
    ],
    "no-tabs": ["error", { allowIndentationTabs: true }],
    "multiline-ternary": ["off"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
  },

};
