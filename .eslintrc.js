module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "comma-dangle": ["error", "never"],
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "no-console": "off",
    semi: ["error", "never"]
  },
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3"
    }
  ]
}
