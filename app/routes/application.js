import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { UnauthorizedError } from '@ember-data/adapter/error';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  @service store;
  @service router;

  async model() {
    return this.store.findRecord('user', 'self');
  }

  @action
  error(error) {
    if (error instanceof UnauthorizedError) {
      // TODO: Handle the unauthorized error
      console.log(error.message);
    }
  }
}
