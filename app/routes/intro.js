import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'website-www/config/environment';
import { inject as service } from '@ember/service';

export default class IntroRoute extends Route {
  queryParams = {
    id: { refreshModel: true },
  };

  @service fastboot;
  @service router;

  async model(params) {
    const userId = params.id;
    const response = await fetch(`${ENV.BASE_API_URL}/users/${userId}/intro`, {
      credentials: 'include',
    });

    if (response.status === 404) {
      this.router.transitionTo('/page-not-found');
    }

    const data = await response.json();
    return data.data;
  }
}
