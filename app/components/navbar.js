import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { APPS, AUTH } from '../constants/urls';

export default class NavbarComponent extends Component {
  @tracked isNavOpen = false;
  @tracked isMenuOpen = false;
  @tracked authURL = this.generateAuthURL();

  HOME_URL = APPS.HOME;
  WELCOME_URL = APPS.WELCOME;
  EVENTS_URL = APPS.EVENTS;
  MEMBERS_URL = APPS.MEMBERS;
  CRYPTO_URL = APPS.CRYPTO;
  STATUS_URL = APPS.STATUS;
  PROFILE_URL = APPS.PROFILE;
  AUTH_URL = AUTH.SIGN_IN;

  @action toggleNavbar() {
    this.isNavOpen = !this.isNavOpen;
  }

  @action toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action outsideClickMenu() {
    this.isMenuOpen = false;
  }

  generateAuthURL() {
    const originURL = window.location.href;
    if (!originURL) return AUTH.SIGN_IN;
    const signInLink = AUTH.SIGN_IN + '&state=' + originURL;
    return signInLink;
  }
}
