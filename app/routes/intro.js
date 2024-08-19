import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { APPLICATION_URL } from '../constants/apis';

export default class IntroRoute extends Route {
  queryParams = {
    id: { refreshModel: true },
  };

  @service fastboot;
  @service router;

  async model(params) {
    const userId = params.id;
    try {
      const response = await fetch(APPLICATION_URL(userId), {
        credentials: 'include',
      });
      if (response.status === 404) {
        this.router.transitionTo('/page-not-found');
        return {};
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching application data:', error);
      return {};
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.initializeStatusFlags();
  }
}
