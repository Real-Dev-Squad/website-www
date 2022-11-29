import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { APPS, AUTH } from '../constants/urls';

export default class NavbarComponent extends Component {
  @tracked isNavOpen = false;
  @tracked isMenuOpen = false;

  AUTH_URL = AUTH.SIGN_IN;
  HOME_PAGE_URL = APPS.HOME;

  RDS_APPS_MAPPING = [
    {
      siteName: 'Welcome',
      url: APPS.WELCOME,
    },
    {
      siteName: 'Events',
      url: APPS.EVENTS,
    },
    {
      siteName: 'Members',
      url: APPS.MEMBERS,
    },
    {
      siteName: 'Crypto',
      url: APPS.CRYPTO,
    },
    {
      siteName: 'Status',
      url: APPS.STATUS,
    },
  ];

  @action toggleNavbar() {
    this.isNavOpen = !this.isNavOpen;
  }

  @action toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action outsideClickMenu() {
    this.isMenuOpen = false;
  }
}
