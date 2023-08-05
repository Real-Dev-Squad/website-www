'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'website-www',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    fastboot: {
      hostWhitelist: [/^localhost:\d+$/, 'dev.realdevsquad.com'],
    },
  };

  if (environment === 'production') {
    ENV.BASE_API_URL = 'https://api.realdevsquad.com';
    ENV.APPS = {
      HOME: 'https://beta.realdevsquad.com/',
      WELCOME: 'https://welcome.realdevsquad.com/',
      EVENTS: 'https://realdevsquad.com/events/',
      MEMBERS: 'https://members.realdevsquad.com/',
      STATUS: 'https://status.realdevsquad.com/',
      PROFILE: 'https://my.realdevsquad.com/',
    };
    ENV.fastboot.hostWhitelist = ['realdevsquad.com'];
  }

  if (environment === 'staging') {
    ENV.BASE_API_URL = 'https://staging-api.realdevsquad.com';
    ENV.APPS = {
      HOME: 'https://beta.realdevsquad.com/',
      WELCOME: 'https://staging-welcome.realdevsquad.com/',
      EVENTS: 'https://staging-www.realdevsquad.com/events/',
      MEMBERS: 'https://staging-members.realdevsquad.com/',
      STATUS: 'https://staging-status.realdevsquad.com/',
      PROFILE: 'https://staging-my.realdevsquad.com/',
    };
    ENV.fastboot.hostWhitelist = ['beta.realdevsquad.com'];
  }

  if (environment === 'development') {
    ENV.BASE_API_URL = 'http://localhost:3000';
    ENV.APPS = {
      HOME: 'https://beta.realdevsquad.com/',
      WELCOME: 'https://staging-welcome.realdevsquad.com/',
      EVENTS: 'https://staging-www.realdevsquad.com/events/',
      MEMBERS: 'https://staging-members.realdevsquad.com/',
      STATUS: 'https://staging-status.realdevsquad.com/',
      PROFILE: 'https://staging-my.realdevsquad.com/',
    };

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
