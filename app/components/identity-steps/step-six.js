import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';
import { APPS } from '../../constants/urls';

export default class IdentityStepsStepSixComponent extends Component {
  @service toast;
  @tracked isLoading = false;

  @action async handleVerify(e) {
    e.preventDefault();
    this.isLoading = true;

    try {
      const response = await fetch(`${APPS.API_BACKEND}/users/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        this.toast.info(
          'Your request has been queued successfully',
          '',
          toastNotificationTimeoutOptions
        );
      } else {
        this.toast.error(
          'Something went wrong. Please check console errors.',
          '',
          toastNotificationTimeoutOptions
        );
      }
    } catch (error) {
      this.toast.error(
        'Something went wrong. Please check console errors.',
        '',
        toastNotificationTimeoutOptions
      );
    } finally {
      this.isLoading = false;
      this.args.startHandler();
    }
  }
}
