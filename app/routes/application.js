import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import checkAuth from '../helpers/check-auth';
import { AUTH } from '../constants/urls';

export default class IndexRoute extends Route {
  @service store;
  @service router;

  async model() {
    if (checkAuth()) {
      return this.store.findRecord('user', 'self');
    }
  }

  afterModel(model) {
    if (checkAuth()) {
      if (model.incompleteUserDetails) {
        window.location.replace(AUTH.SIGN_UP);
      }
    }
  }

  @action
  error(error) {
    if (error instanceof Error) {
      const originURL = window.location.href;
      if (!originURL) return AUTH.SIGN_IN;
      const signInLink = AUTH.SIGN_IN + '&state=' + originURL;

      const loginBtn = document.querySelector('login');
      loginBtn.setAttribute('href', signInLink);

      this.router.transitionTo('error');
      throw new Error(error.message);
    }
  }
}
