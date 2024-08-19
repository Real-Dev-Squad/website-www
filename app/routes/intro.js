import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { APPLICATION_ID_LINK, APPLICATION_URL } from '../constants/apis';
import { APPS } from '../constants/urls';

export default class IntroRoute extends Route {
  queryParams = {
    id: { refreshModel: true },
    status: { refreshModel: true },
  };

  @service fastboot;
  @service router;

  async model(params) {
    if (this.fastboot.isFastBoot) {
      return;
    }
    const userId = params.id;
    const status = params.status;

    try {
      let userResponse;
      let userData;

      if (status === 'submitted') {
        userResponse = await fetch(`${APPS.API_BACKEND}/users/self`, {
          credentials: 'include',
        });
        userData = await userResponse.json();
      }

      const response = await fetch(APPLICATION_URL(userId), {
        credentials: 'include',
      });

      if (response.status === 404) {
        this.router.transitionTo('/page-not-found');
        return;
      }

      const applicationData = await response.json();
      const applicationId = applicationData.data[0].id;

      if (userData?.roles?.super_user) {
        window.location.replace(APPLICATION_ID_LINK(applicationId));
      }

      return applicationData.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      this.router.transitionTo('/page-not-found');
    }
  }
}
