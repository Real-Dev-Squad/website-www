import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TOAST_OPTIONS } from '../../constants/toast-options';
import { ANKUSH_TWITTER } from '../../constants/urls';
export default class StepFiveComponent extends Component {
  @service toast;
  ANKUSH_TWITTER = ANKUSH_TWITTER;
  @tracked userId = localStorage.getItem('id');
  @tracked joinLink = `https://api.realdevsquad.com/users/${this.userId}/intro`;

  @action onSuccess() {
    this.toast.success(
      'Successfully Copied to clipboard',
      'Link Copied!',
      TOAST_OPTIONS
    );
  }

  @action onError() {
    this.toast.error('Error in copying to clipboard', 'Error!', TOAST_OPTIONS);
  }
}
