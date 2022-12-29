import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { AUTH } from '../constants/urls';

export default class LoginService extends Service {
  @service store;
  @tracked isLoggedIn = false;
  @tracked userData;

  constructor() {
    super(...arguments);
    this.checkAuth();
  }

  async checkAuth() {
    try {
      const user = await this.store.findRecord('user', 'self');
      if (user) {
        this.userData = user;
        if (user.incompleteUserDetails) window.location.replace(AUTH.SIGN_UP);
        else this.isLoggedIn = true;

        // const originURL = window.location.href;
        // if (!originURL) return AUTH.SIGN_IN;
        // const signInLink = AUTH.SIGN_IN + '&state=' + originURL;

        // const loginBtn = document.querySelector('login');
        // loginBtn.setAttribute('href', signInLink);
      }
    } catch (error) {
      this.isLoggedIn = false;
    }
  }
}
