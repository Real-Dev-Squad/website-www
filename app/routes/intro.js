import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { APPLICATION_URL, USER_APPLICATION_LINK } from '../constants/apis';
import { APPS } from '../constants/urls';

export default class IntroRoute extends Route {
  queryParams = {
    id: { refreshModel: true },
    status: { refreshModel: true },
  };

  @service fastboot;
  @service router;
  @service login;

  async model(params) {
    const userId = params.id;
    const status = params.status;

    try {
      const response = await fetch(APPLICATION_URL(userId), {
        credentials: 'include',
      });

      const userResponse = await fetch(`${APPS.API_BACKEND}/users/self`, {
        credentials: 'include',
      });

      const userData = await userResponse.json();

      if (response.status === 404) {
        this.router.transitionTo('/page-not-found');
        return;
      }

      const data = await response.json();

      if (status === 'submitted' && userData.roles?.super_user) {
        window.location.replace(USER_APPLICATION_LINK(userId));
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      this.router.transitionTo('/page-not-found');
    }
  }
}
