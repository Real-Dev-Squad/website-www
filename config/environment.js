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
  };

  if (environment === 'production') {
    ENV.BASE_API_URL = 'https://api.realdevsquad.com';
  }

  if (environment === 'staging') {
    ENV.BASE_API_URL = 'https://staging-api.realdevsquad.com';
  }

  if (environment === 'development') {
    ENV.BASE_API_URL = 'http://localhost:3000';
    ENV.BASE_100MS_URL =
      'https://prod-in2.100ms.live/hmsapi/sanketdhabardelive.app.100ms.live';
    ENV.ROOM_ID = '6399de60b806bb263907e17d';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.BASE_100MS_URL =
      'https://prod-in2.100ms.live/hmsapi/sanketdhabardelive.app.100ms.live';
    ENV.ROOM_ID = '6399de60b806bb263907e17d';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
