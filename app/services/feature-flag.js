import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class FeatureFlagService extends Service {
  @service router;

  get isDevMode() {
    const queryParams = this.router?.currentRoute?.queryParams;
    return queryParams?.dev === 'true';
  }
}
