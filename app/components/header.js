import Component from '@glimmer/component';
import { SOCIALS } from '../constants/urls';

export default class HeaderComponent extends Component {
  LINKEDIN_URL = SOCIALS.LINKEDIN;
  TWITTER_URL = SOCIALS.TWITTER;
  FACEBOOK_URL = SOCIALS.FACEBOOK;
  INSTAGRAM_URL = SOCIALS.INSTAGRAM;
}
