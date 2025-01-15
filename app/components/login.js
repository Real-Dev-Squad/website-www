import Component from '@glimmer/component';
import { AUTH } from '../constants/urls';
import { service } from '@ember/service';

export default class LoginComponent extends Component {
  @service router;
  @service fastboot;

  AUTH_URL = this.generateAuthURL();

  generateAuthURL() {
    let currentURL = this.fastboot.isFastBoot
      ? this.fastboot.request.protocol +
        '//' +
        this.fastboot.request.host +
        this.fastboot.request.path
      : window.location.href;

    if (currentURL) {
      currentURL = currentURL.includes('login')
        ? currentURL.replace('login', '')
        : currentURL;
    }

    return {
      GITHUB: `${AUTH.GITHUB_SIGN_IN}?redirectURL=${currentURL}`,
      GOOGLE: `${AUTH.GOOGLE_SIGN_IN}&redirectURL=${currentURL}`,
    };
  }
}
