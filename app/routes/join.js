import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class JoinRoute extends Route {
  @service login;
  @service router;

  afterModel() {
    if (this.login?.userData?.roles?.archived) {
      this.router.transitionTo(`archived`);
    }
  }
}
