const config = {
  preset: 'jest-puppeteer',
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*'],
  reporters: ['default'],
  coverageDirectory: 'coverage',
  verbose: true,
  testEnvironment: 'node', // Use 'node' for Puppeteer
};

module.exports = config;
