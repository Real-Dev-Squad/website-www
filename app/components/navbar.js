import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { APPS, AUTH } from '../constants/urls';
import { inject as service } from '@ember/service';

export default class NavbarComponent extends Component {
  @service router;
  @service fastboot;
  @tracked isNavOpen = false;
  @tracked isMenuOpen = false;
  @tracked authURL = this.generateAuthURL();

  HOME_URL = APPS.HOME;
  WELCOME_URL = APPS.WELCOME;
  EVENTS_URL = APPS.EVENTS;
  MEMBERS_URL = APPS.MEMBERS;
  STATUS_URL = APPS.STATUS;
  PROFILE_URL = APPS.PROFILE;
  AUTH_URL = this.generateAuthURL();
  LIVE_URL = APPS.LIVE;

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
    const currentURL = this.fastboot.isFastBoot
      ? this.fastboot.request.protocol +
        '//' +
        this.fastboot.request.host +
        this.fastboot.request.path
      : window.location.href;
    return `${AUTH.SIGN_IN}?redirectURL=${currentURL}`;
  }

  get isDev() {
    if (this.router.currentRoute) {
      return this.router.currentRoute.queryParams.dev;
    }
    return false;
  }
}
