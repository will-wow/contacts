module.exports = {
  transform: {
    "^.+\\.js$": ["babel-jest"],
    "^.+\\.svelte$": "jest-transform-svelte"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/svelte/cleanup-after-each"
  ],
  moduleFileExtensions: ["js", "svelte"],
  modulePaths: ["<rootDir>/app/javascript/src"],
  testMatch: ["<rootDir>/test/javascript/**/*.test.js"]
}
