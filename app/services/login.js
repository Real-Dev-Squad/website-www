import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { AUTH } from '../constants/urls';

export default class LoginService extends Service {
  @service store;
  @tracked isLoggedIn = false;
  @tracked userData;
  @tracked isLoading = true;
  @service fastboot;
  @service featureFlag;

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
        if (user.incompleteUserDetails && !this.featureFlag.isDevMode)
          window.location.replace(AUTH.SIGN_UP);
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
