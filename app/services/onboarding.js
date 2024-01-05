import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';
import { ERROR_MESSAGES } from '../constants/error-messages';
import { POST_API_CONFIGS } from '../constants/live';
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

  async discordInvite() {
    try {
      const response = await fetch(
        `${APPS.API_BACKEND}/discord-actions/invite`,
        {
          ...POST_API_CONFIGS,
        },
      );
      const { invite } = await response.json();
      console.log('invite', invite);
      return invite;
    } catch (error) {
      console.error(error);
      this.toast.error('Something went wrong!', 'error!', TOAST_OPTIONS);
    }
  }
}
