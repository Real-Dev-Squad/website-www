const config = {
  preset: 'jest-puppeteer',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  reporters: ['default'],
  coverageDirectory: 'coverage',
  testEnvironment: "node",
};
module.exports = config;