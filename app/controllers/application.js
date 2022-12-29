import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'website-www/config/environment';

export default class ApplicationController extends Controller {
  @service login;

  @action async signOut() {
    try {
      fetch(`${ENV.BASE_API_URL}/auth/signout`, {
        method: 'GET',
        credentials: 'include',
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
