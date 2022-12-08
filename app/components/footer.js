import Component from '@glimmer/component';
import { APPS, ABOUT, SOCIALS } from '../constants/urls';

export default class FooterComponent extends Component {
  APPS_PROPERTIES = [
    {
      url: APPS.HOME,
      name: 'Home',
    },
    {
      url: APPS.WELCOME,
      name: 'Welcome',
    },
    {
      url: APPS.EVENTS,
      name: 'Events',
    },
    {
      url: APPS.MEMBERS,
      name: 'Members',
    },
    {
      url: APPS.CRYPTO,
      name: 'Crypto',
    },
    {
      url: APPS.STATUS,
      name: 'Status',
    },
    {
      url: APPS.PROFILE,
      name: 'My Profile',
    },
  ];

  ABOUT_PROPERTIES = [
    {
      url: ABOUT.JOIN,
      name: 'How to Join?',
    },
    {
      url: ABOUT.FAQ,
      name: 'FAQ',
    },
    {
      url: ABOUT.DISCORD,
      name: 'Discord',
    },
    {
      url: ABOUT.COC,
      name: 'Code of Conduct',
    },
  ];

  SOCIAL_LINK_PROPERTIES = [
    {
      url: SOCIALS.LINKEDIN.URL,
      icon: SOCIALS.LINKEDIN.ICON,
      alt: SOCIALS.LINKEDIN.TITLE,
    },
    {
      url: SOCIALS.TWITTER.URL,
      icon: SOCIALS.TWITTER.ICON,
      alt: SOCIALS.TWITTER.TITLE,
    },
    {
      url: SOCIALS.FACEBOOK.URL,
      icon: SOCIALS.FACEBOOK.ICON,
      alt: SOCIALS.FACEBOOK.TITLE,
    },
    {
      url: SOCIALS.INSTAGRAM.URL,
      icon: SOCIALS.INSTAGRAM.ICON,
      alt: SOCIALS.INSTAGRAM.TITLE,
    },
  ];
}
