import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class OnboardingService extends Service {
  @service store;
  @service login;
  @service toast;

  constructor() {
    super(...arguments);
    this.login.checkAuth();
  }
  async signup(dataToUpdate) {
    try {
      let user = this.store.peekRecord('user', dataToUpdate.username);

      if (!user) {
        user = this.store.createRecord('user', {
          username: dataToUpdate.username,
        });
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
      this.toast.error('Something went wrong!', 'error!', TOAST_OPTIONS);
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
      if (user && user.get('username')) {
        return user;
      }
    } catch (err) {
      this.toast.error('Username cannot be generated', 'error!', TOAST_OPTIONS);
    }
  }
}
