import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import redirectAuth from '../utils/redirect-auth';
import { USER_STATES } from '../constants/user-status';
import { APPS } from '../constants/urls';
import { TOAST_OPTIONS } from '../constants/toast-options';
const BASE_URL = APPS.API_BACKEND;

export default class StatusRoute extends Route {
  @service toast;
  @service router;

  async model() {
    try {
      const response = await fetch(`${BASE_URL}/users/status/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 200) {
        return userData?.data?.currentStatus?.state ?? USER_STATES.DNE;
      } else if (response.status === 401) {
        this.toast.error(
          'You are not logged in. Please login to continue.',
          'Error!',
          TOAST_OPTIONS,
        );
        // added setTimeout here because before new page opens user should be notified of error by toast
        setTimeout(redirectAuth, 2000);
      } else if (response.status === 404) {
        this.toast.error(
          "Your Status data doesn't exist yet. Please choose your status from the options below.",
          'Error!',
          TOAST_OPTIONS,
        );
        return USER_STATES.DNE;
      }
    } catch (error) {
      console.error(error.message);
      this.toast.error(
        'Something went wrong. ' + error.message,
        'Error!',
        TOAST_OPTIONS,
      );
    }
  }
}
