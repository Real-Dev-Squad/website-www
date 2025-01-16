import Route from '@ember/routing/route';
import { APPS } from '../constants/urls';
import { inject as service } from '@ember/service';
import redirectAuth from '../utils/redirect-auth';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class DiscordRoute extends Route {
  @service router;
  @service toast;

  queryParams = {
    token: { refreshModel: true },
  };

  beforeModel(transition) {
    if (!transition.to.queryParams.dev) {
      this.router.transitionTo('page-not-found');
    }
  }

  async model() {
    try {
      const token = this.paramsFor('discord').token;
      const externalAccountResponse = await fetch(
        `${APPS.API_BACKEND}/external-accounts/${token}`,
        {
          credentials: 'include',
        },
      );

      const userResponse = await fetch(
        `${APPS.API_BACKEND}/users?profile=true`,
        {
          credentials: 'include',
        },
      );

      const externalAccountData = await externalAccountResponse.json();
      const userData = await userResponse.json();

      if (
        userResponse.status === 200 &&
        externalAccountResponse.status === 200
      ) {
        return { externalAccountData, userData, isTokenEpired: false };
      } else if (userResponse.status === 401) {
        this.toast.error(userData.message, '', TOAST_OPTIONS);
        setTimeout(redirectAuth, 2000);
      } else if (externalAccountResponse.status === 401) {
        this.toast.error(externalAccountData.message, '', TOAST_OPTIONS);

        return { isTokenExpired: true };
      }
    } catch (error) {
      this.toast.error(error.message, '', TOAST_OPTIONS);
      console.error(error.message);
    }
  }
}
