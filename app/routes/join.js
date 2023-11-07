import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { APPS } from '../constants/urls';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

export default class JoinRoute extends Route {
  @service login;
  @service toast;
  async model() {
    try {
      const response = await fetch(`${APPS.API_BACKEND}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 401) {
        throw new Error('You are not logged in. Please login to continue.');
      }
      return userData;
    } catch (error) {
      console.error(error.message);
      this.toast.error(error, '', toastNotificationTimeoutOptions);
    }
  }
}
