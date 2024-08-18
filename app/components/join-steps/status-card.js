import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { APPLICATION_STATUS_TYPES } from '../../constants/join';
import { USER_JOINED_LINK } from '../../constants/apis';
import { TOAST_OPTIONS } from '../../constants/toast-options';
import { ANKUSH_TWITTER } from '../../constants/urls';

export default class StatusCardComponent extends Component {
  @service login;
  @service router;
  @service onboarding;
  @service toast;

  @tracked joinLink = USER_JOINED_LINK(this.login.userData?.id);
  @tracked status;
  @tracked feedback;

  APPLICATION_STATUS_TYPES = APPLICATION_STATUS_TYPES;
  ANKUSH_TWITTER = ANKUSH_TWITTER;

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

  constructor() {
    super(...arguments);
    this.fetchStatus();
  }

  get applicationStatus() {
    return this.onboarding.applicationData?.status;
  }

  get applicationFeedback() {
    return this.onboarding.applicationData?.feedback;
  }

  @action
  async fetchStatus() {
    await this.onboarding.getApplicationDetails();
    this.status = this.applicationStatus;
    this.feedback = this.applicationFeedback;
  }

  @action redirectToHome() {
    this.router.transitionTo('/');
  }

  @action
  onSuccess() {
    this.toast.success(
      'Successfully copied to clipboard',
      'Link Copied!',
      TOAST_OPTIONS,
    );
  }

  @action
  onError() {
    this.toast.error('Error in copying to clipboard', 'Error!', TOAST_OPTIONS);
  }
}
