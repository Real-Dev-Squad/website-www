import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class JoinRoute extends Route {
  @service login;
  @service toast;

  async beforeModel() {
    if (!this.login.isLoggedIn) {
      this.toast.error(
        'Please sign in with GitHub to continue',
        'Login Required',
        TOAST_OPTIONS,
      );
    }
  }
}
