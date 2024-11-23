import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'website-www/config/environment';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import redirectAuth from '../utils/redirect-auth';

export default class ProfileRoute extends Route {
  @service toast;
  async model() {
    try {
      const res = await fetch(`${ENV.BASE_API_URL}/users/isDeveloper`, {
        credentials: 'include',
      });
      const { developerRoleExistsOnUser } = await res.json();

      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();

      if (response.status === 401) {
        throw new Error('You are not logged in. Please login to continue.');
      }
      userData.isDeveloper = developerRoleExistsOnUser;
      console.log(userData);
      return userData;
    } catch (error) {
      console.error(error.message);
      this.toast.error(error, '', toastNotificationTimeoutOptions);

      setTimeout(redirectAuth, 5000);
    }
  }
}
