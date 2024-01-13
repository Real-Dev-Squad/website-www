import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { APPS } from '../../constants/urls';
import { TOAST_OPTIONS } from '../../constants/toast-options';

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
      if (response.ok)
        return this.toast.info(
          'Your request has been queued successfully',
          'Info',
          TOAST_OPTIONS,
        );
    } catch (error) {
      this.toast.error(
        'Something went wrong. Please check console errors.',
        'Error',
        TOAST_OPTIONS,
      );
    } finally {
      this.isLoading = false;
      this.args.startHandler();
    }
  }
}
