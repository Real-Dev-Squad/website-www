import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'website-www/config/environment';
import fetch from 'fetch';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import redirectAuth from '../utils/redirect-auth';

export default class ProfileRoute extends Route {
  @service toast;
  @service fastboot;
  @service router;
  beforeModel(transition) {
    if (transition?.to?.queryParams?.dev !== 'true') {
      this.router.transitionTo('/page-not-found');
    }
  }
  async model() {
    try {
      const res = await fetch(`${ENV.BASE_API_URL}/users/isDeveloper`, {
        credentials: 'include',
      });
      const { developerRoleExistsOnUser } = await res.json();

      const response = await fetch(`${ENV.BASE_API_URL}/users?profile=true`, {
        credentials: 'include',
      });
      const userData = await response.json();

      if (response.status === 401) {
        throw new Error('You are not logged in. Please login to continue.');
      }
      userData.isDeveloper = developerRoleExistsOnUser;
      return userData;
    } catch (error) {
      console.error(error.message);
      this.toast.error(error, '', toastNotificationTimeoutOptions);

      if (!this.fastboot.isFastBoot && !this.isRedirecting) {
        this.isRedirecting = true;
        setTimeout(() => {
          redirectAuth();
          this.isRedirecting = false;
        }, 2000);
      }
    }
  }
}
