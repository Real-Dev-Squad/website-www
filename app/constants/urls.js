import ENV from 'website-www/config/environment';

const SCHEMA = 'https://';
const DOMAIN = 'realdevsquad.com';

const APP_URLS = {
  production: {
    HOME: `${SCHEMA}beta.${DOMAIN}`,
    WELCOME: `${SCHEMA}welcome.${DOMAIN}`,
    EVENTS: `${SCHEMA}${DOMAIN}/events`,
    MEMBERS: `${SCHEMA}members.${DOMAIN}`,
    STATUS: `${SCHEMA}status.${DOMAIN}`,
    PROFILE: `${SCHEMA}my.${DOMAIN}`,
    API_BACKEND: `${SCHEMA}api.${DOMAIN}`,
  },
  staging: {
    HOME: `${SCHEMA}beta.${DOMAIN}`,
    WELCOME: `${SCHEMA}staging-welcome.${DOMAIN}`,
    EVENTS: `${SCHEMA}staging-www.${DOMAIN}/events`,
    MEMBERS: `${SCHEMA}staging-members.${DOMAIN}`,
    STATUS: `${SCHEMA}staging-status.${DOMAIN}`,
    PROFILE: `${SCHEMA}staging-my.${DOMAIN}`,
    API_BACKEND: `${SCHEMA}staging-api.${DOMAIN}`,
  },
  development: {
    HOME: `${SCHEMA}beta.${DOMAIN}`,
    WELCOME: `${SCHEMA}staging-welcome.${DOMAIN}`,
    EVENTS: `${SCHEMA}staging-www.${DOMAIN}/events`,
    MEMBERS: `${SCHEMA}staging-members.${DOMAIN}`,
    STATUS: `${SCHEMA}staging-status.${DOMAIN}`,
    PROFILE: `${SCHEMA}staging-my.${DOMAIN}`,
    API_BACKEND: `${SCHEMA}staging-api.${DOMAIN}`,
  },
  test: {
    HOME: `${SCHEMA}${DOMAIN}`,
    WELCOME: `${SCHEMA}welcome.${DOMAIN}`,
    EVENTS: `${SCHEMA}${DOMAIN}/events`,
    MEMBERS: `${SCHEMA}members.${DOMAIN}`,
    STATUS: `${SCHEMA}status.${DOMAIN}`,
    PROFILE: `${SCHEMA}my.${DOMAIN}`,
    API_BACKEND: `${SCHEMA}staging-api.${DOMAIN}`,
  },
};

export const APPS = { ...APP_URLS[ENV.environment], LIVE: 'live' };

export const ABOUT = {
  FAQ: `${APPS.WELCOME}/faq.html`,
  REPOSITORY: 'https://github.com/Real-Dev-Squad/website-www',
  VIDEO: 'https://www.youtube.com/embed/8UPjK1wLnTk?controls=0',
};

export const AUTH = {
  SIGN_IN: `${APPS.API_BACKEND}/auth/github/login`,
  SIGN_UP: `${APPS.PROFILE}/new-signup`,
};

export const SOCIALS = {
  LINKEDIN: {
    URL: 'https://www.linkedin.com/company/real-dev-squad',
    TITLE: 'LinkedIn',
    ICON: 'assets/icons/linkedin-logo.png',
    WHITE_ICON: 'assets/icons/linkedin-white.png',
  },
  TWITTER: {
    URL: 'https://twitter.com/realdevsquad?lang=en',
    TITLE: 'Twitter',
    ICON: 'assets/icons/twitter-logo.png',
    WHITE_ICON: 'assets/icons/twitter-white.png',
  },
  FACEBOOK: {
    URL: 'https://www.facebook.com/Real-Dev-Squad-108713777585062/',
    TITLE: 'Facebook',
    ICON: 'assets/icons/facebook-logo.png',
    WHITE_ICON: 'assets/icons/facebook-white.png',
  },
  INSTAGRAM: {
    URL: 'https://www.instagram.com/realdevsquad/?hl=en',
    TITLE: 'Instagram',
    ICON: 'assets/icons/instagram-logo.png',
    WHITE_ICON: 'assets/icons/instagram-white.png',
  },
};

export const ANKUSH_TWITTER = 'https://twitter.com/ankushdharkar';
