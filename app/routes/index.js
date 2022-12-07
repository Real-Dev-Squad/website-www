import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  @service router;

  async model() {
    this.store.findAll('members');
  }
}
