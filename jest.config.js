const config = {
  preset: 'jest-puppeteer',
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*'],
  reporters: ['default'],
  coverageDirectory: 'coverage',
  verbose: true,
};

module.exports = config;
