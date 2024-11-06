const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  baseUrl: "https://meta4-dev.srv.festcloud.ai/",
  chromeWebSecurity: false,
  watchForFileChanges: false,
  defaultCommandTimeout: 20000,
  requestTimeout: 4000,
  ensureScrollable: false,
  waitForAnimations: true,
  viewportHeight: 1080,
  viewportWidth: 1920,
  videoUploadOnPasses: false,
  testTimeout: 216000000,
  numTestsKeptInMemory: 10,
  experimentalMemoryManagement: true,
  projectId: "n29mek",


  },
});
