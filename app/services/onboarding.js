import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';
import { ERROR_MESSAGES } from '../constants/error-messages';
import { APPS } from '../constants/urls';

export default class OnboardingService extends Service {
  @service store;
  @service toast;

  async signup(dataToUpdate) {
    try {
      let user = this.store.peekRecord('user', dataToUpdate.username);

      if (!user) {
        user = this.store.createRecord('user', {});
      }

      if (dataToUpdate.roles) {
        user.set('roles', {
          ...user.get('roles'),
          ...dataToUpdate.roles,
        });
      }

      user.setProperties({
        first_name: dataToUpdate.first_name,
        last_name: dataToUpdate.last_name,
      });

      await user.save();
    } catch (error) {
      this.toast.error(
        ERROR_MESSAGES.somethingWentWrong,
        'error!',
        TOAST_OPTIONS,
      );
    }
  }

  async generateUsername(firstname, lastname) {
    try {
      const sanitizedFirstname = firstname.toLowerCase();
      const sanitizedLastname = lastname.toLowerCase();
      const user = await this.store.queryRecord('user', {
        firstname: sanitizedFirstname,
        lastname: sanitizedLastname,
        dev: true,
      });
      if (user && user.username) {
        return user;
      }
    } catch (err) {
      this.toast.error(
        ERROR_MESSAGES.usernameGeneration,
        'error!',
        TOAST_OPTIONS,
      );
    }
  }

  async addApplication(data) {
    try {
      const response = await fetch(`${APPS.API_BACKEND}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: data,
      });
      return response;
    } catch (err) {
      console.log('Error: ', err);
      this.toast.error('Some error occured', 'Error ocurred!', TOAST_OPTIONS);
    }
  }
}
