import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { APPS } from '../constants/urls';
import { TOAST_OPTIONS } from '../constants/toast-options';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

export default class OnboardingService extends Service {
  @service login;
  @service toast;

  constructor() {
    super(...arguments);
    this.login.checkAuth();
  }

  async signup(dataToUpdate, role) {
    console.log('inside signup');
    try {
      const response = await fetch(`${APPS.API_BACKEND}/users/self`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...dataToUpdate,
          roles: {
            ...dataToUpdate.roles,
            [role.toLowerCase()]: true,
          },
        }),
      });
      if (response.status === 204) {
        localStorage.setItem('role', role);
        return response.status;
      } else {
        this.toast.error('Something went wrong!', 'error!', TOAST_OPTIONS);
      }
    } catch (error) {
      this.toast.error('Something went wrong!', 'error!', TOAST_OPTIONS);
    }
  }

  async generateUsername(firstname, lastname) {
    try {
      const sanitizedFirstname = firstname.toLowerCase();
      const sanitizedLastname = lastname.toLowerCase();
      const response = await fetch(
        `${APPS.API_BACKEND}/users/username?firstname=${sanitizedFirstname}&lastname=${sanitizedLastname}&dev=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        return data;
      } else if (response.status === 401) {
        this.toast.error(
          'Please login to continue.',
          '',
          toastNotificationTimeoutOptions
        );
      }
    } catch (err) {
      this.toast.error('Something went wrong!', 'error!', TOAST_OPTIONS);
    }
  }
}
