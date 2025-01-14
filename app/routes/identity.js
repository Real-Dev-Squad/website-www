import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { APPS } from '../constants/urls';
export default class IdentityRoute extends Route {
  @service router;
  @service login;
  @service fastboot;

  beforeModel(transition) {
    if (transition?.to?.queryParams?.dev !== 'true') {
      this.router.transitionTo('page-not-found');
      return;
    }
  }

  async model() {
    if (this.fastboot.isFastBoot) {
      return null;
    }

    try {
      const response = await fetch(`${APPS.API_BACKEND}/users?profile=true`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.router.transitionTo('index');
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.roles?.in_discord) {
        this.router.transitionTo('index');
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.router.transitionTo('index');
      return null;
    }
  }
}
