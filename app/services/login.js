import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { APPS } from '../constants/urls';
import fetch from 'fetch';

export default class LoginService extends Service {
  @service store;
  @tracked isLoggedIn = false;
  @tracked userData;
  @tracked isLoading = true;
  @service fastboot;
  @service featureFlag;

  HeadersToCopy = ['Host', 'Cookie', 'User-Agent'];

  constructor() {
    super(...arguments);

    this.checkAuth();
  }

  checkAuth() {
    fetch(`${APPS.API_BACKEND}/users/self`, {
      credentials: 'include',
      headers: this.buildHeaders(),
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.userData = data;
        this.isLoggedIn = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
    // this.store
    //   .findRecord('user', 'self')
    //   .then((user) => {
    //     if (user.incompleteUserDetails && !this.featureFlag.isDevMode)
    //       window.location.replace(AUTH.SIGN_UP);
    //     this.isLoggedIn = true;
    //     this.userData = user;
    //   })
    //   .catch((error) => {
    //     this.isLoggedIn = false;
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     this.isLoading = false;
    //   });
  }

  buildHeaders(headers = {}) {
    let isFastBoot = this.fastboot.isFastBoot;

    if (!isFastBoot) {
      return headers;
    }

    let requestHeaders = this.fastboot.request.headers;
    this.HeadersToCopy.forEach((n) => (headers[n] = requestHeaders.get(n)));
    headers['X-forwarded-by'] = 'FastBoot';

    return headers;
  }
}
