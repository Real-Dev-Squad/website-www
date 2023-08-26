import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { AUTH } from '../constants/urls';

export default class LoginService extends Service {
  @service store;
  @tracked isLoggedIn;
  @tracked userData;
  @service router;
  @tracked isLoading = true;

  constructor() {
    super(...arguments);
    this.checkAuth();
  }

  async checkAuth() {
    try {
      const user = await this.store.findRecord('user', 'self');
      if (user) {
        if (user.incompleteUserDetails) window.location.replace(AUTH.SIGN_UP);
        this.isLoggedIn = true;
        this.userData = user;
      }
    } catch (error) {
      this.isLoggedIn = false;
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
