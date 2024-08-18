import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { APPLICATION_STATUS_TYPES } from '../../constants/join';
import { tracked } from '@glimmer/tracking';
import { USER_JOINED_LINK } from '../../constants/apis';
import { TOAST_OPTIONS } from '../../constants/toast-options';

export default class StatusCardComponent extends Component {
  @service login;
  @service router;
  @service toast;

  @tracked joinLink = USER_JOINED_LINK(this.login.userData.id);

  APPLICATION_STATUS_TYPES = APPLICATION_STATUS_TYPES;

  APPLICATION_STATUSES = [
    {
      status: APPLICATION_STATUS_TYPES.pending,
      heading: 'Pending',
      icon: 'hourglass-half',
    },
    {
      status: APPLICATION_STATUS_TYPES.rejected,
      heading: 'Rejected',
      icon: 'ban',
    },
    {
      status: APPLICATION_STATUS_TYPES.accepted,
      heading: 'Accepted',
      icon: 'square-check',
    },
  ];
  @action redirectToHome() {
    this.router.transitionTo('/');
  }

  @action onSuccess() {
    this.toast.success(
      'Successfully Copied to clipboard',
      'Link Copied!',
      TOAST_OPTIONS,
    );
  }

  @action onError() {
    this.toast.error('Error in copying to clipboard', 'Error!', TOAST_OPTIONS);
  }
}
