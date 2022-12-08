import Component from '@glimmer/component';
import { SOCIALS } from '../constants/urls';

export default class HeaderComponent extends Component {
  SOCIAL_LINK_PROPERTIES = [
    {
      url: SOCIALS.LINKEDIN.URL,
      icon: SOCIALS.LINKEDIN.ICON,
      title: SOCIALS.LINKEDIN.TITLE,
    },
    {
      url: SOCIALS.TWITTER.URL,
      icon: SOCIALS.TWITTER.ICON,
      title: SOCIALS.TWITTER.TITLE,
    },
    {
      url: SOCIALS.FACEBOOK.URL,
      icon: SOCIALS.FACEBOOK.ICON,
      title: SOCIALS.FACEBOOK.TITLE,
    },
    {
      url: SOCIALS.INSTAGRAM.URL,
      icon: SOCIALS.INSTAGRAM.ICON,
      title: SOCIALS.INSTAGRAM.TITLE,
    },
  ];
}
