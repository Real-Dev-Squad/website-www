import ENV from 'website-www/config/environment';

export const APPS = {
  HOME: ENV.APPS.HOME,
  WELCOME: ENV.APPS.WELCOME,
  EVENTS: ENV.APPS.EVENTS,
  MEMBERS: ENV.APPS.MEMBERS,
  STATUS: ENV.APPS.STATUS,
  PROFILE: ENV.APPS.PROFILE,
  LIVE: 'live',
};

export const ABOUT = {
  FAQ: 'https://welcome.realdevsquad.com/faq.html',
  REPOSITORY: 'https://github.com/Real-Dev-Squad/website-www',
  VIDEO: 'https://www.youtube.com/embed/8UPjK1wLnTk?controls=0',
};

export const AUTH = {
  SIGN_IN: `${ENV.BASE_API_URL}/auth/github/login`,
  SIGN_UP: `${ENV.APPS.PROFILE}/new-signup`,
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
