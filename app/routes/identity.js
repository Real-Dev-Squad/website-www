import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';
import redirectAuth from '../utils/redirect-auth';

export default class IdentityRoute extends Route {
  @service toast;
  @service login;
  @service router;

  async model() {
    try {
      if (!this.login.isLoggedIn) {
        throw new Error('You are not logged in. Please login to continue.');
      }

      const userData = this.login.userData;
      if (!userData.in_discord) {
        this.router.transitionTo('/');
      }
      return userData;
    } catch (error) {
      console.error('Error fetching user data on identity route', error);
      this.toast.error(error, '', TOAST_OPTIONS);
      // added setTimeout here because before new page opens user should be notified of error by toast
      setTimeout(redirectAuth, 2000);
    }
  }
}
