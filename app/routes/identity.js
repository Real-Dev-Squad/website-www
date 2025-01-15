import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class IdentityRoute extends Route {
  @service router;

  beforeModel(transition) {
    if (transition?.to?.queryParams?.dev !== 'true') {
      this.router.transitionTo('/page-not-found');
    }
  }
}
