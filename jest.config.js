const path = require('path')

module.exports = {
  setupTestFrameworkScriptFile: path.resolve(
    __dirname,
    './packages/shared/testing/setup-test-framework'
  ),
  globalSetup: path.resolve(__dirname, './packages/shared/testing/setup'),
  globalTeardown: path.resolve(__dirname, './packages/shared/testing/teardown'),
  testPathIgnorePatterns: ['/node_modules/']
}
