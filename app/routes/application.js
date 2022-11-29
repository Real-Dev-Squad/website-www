import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { UnauthorizedError } from '@ember-data/adapter/error';
import { action } from '@ember/object';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    return this.store.findRecord('user', 'self');
  }

  @action
  error(error) {
    if (error instanceof UnauthorizedError) {
      alert('You are not logged in. Please login to continue.');
      window.open(
        'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
        '_self'
      );
      return;
    }
  }
}
