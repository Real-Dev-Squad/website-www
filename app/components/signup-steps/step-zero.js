import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { AUTH } from '../../constants/urls';

export default class SignupStepsStepZeroComponent extends Component {
  @service login;
  @service router;
  @service fastboot;
  @service store;

  @action logingithub() {
    if (!this.login.isLoggedIn) {
      const currentURL = this.fastboot.isFastBoot
        ? this.fastboot.request.protocol +
          '//' +
          this.fastboot.request.host +
          this.fastboot.request.path
        : window.location.href;
      console.log(AUTH.SIGN_IN, 'signin');
      window.location.href = `${AUTH.SIGN_IN}?redirectURL=${currentURL}`;
    }
  }

  @action letsGoHandler() {
    if (this.login.isLoggedIn && !this.login.isLoading) {
      // Get the current query parameters
      const queryParams = this.router.currentRoute.queryParams;
      // Include dev=true and set step to 1
      queryParams.dev = true;
      queryParams.step = 1;

      // Use Ember router to transition to the next step with both query parameters
      this.router.transitionTo('join', {
        queryParams,
      });
    }
  }
}
