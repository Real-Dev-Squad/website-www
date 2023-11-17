import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { AUTH } from '../constants/urls';

export default class LoginService extends Service {
  @service store;
  @tracked isLoggedIn;
  @tracked userData;
  @tracked isLoading = true;
  @service fastboot;

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.checkAuth();
    }
  }

  checkAuth() {
    this.store
      .findRecord('user', 'self')
      .then((user) => {
        if (user.incompleteUserDetails) window.location.replace(AUTH.SIGN_UP);
        this.isLoggedIn = true;
        this.userData = user;
      })
      .catch((error) => {
        this.isLoggedIn = false;
        console.error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
