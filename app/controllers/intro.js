import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { APPS } from '../constants/urls';
import { validateApplicationDetails } from '../utils/validate-application-details';
import { APPLICATION_STATUS_TYPES } from '../constants/application';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class IntroController extends Controller {
  @service login;
  @service toast;
  @service onboarding;

  @tracked remarks = '';
  @tracked inviteLink = '';
  @tracked isRejected = false;
  @tracked isAccepted = false;
  @tracked isPending = false;
  @tracked feedback = '';

  statusTypes = APPLICATION_STATUS_TYPES;

  constructor() {
    super(...arguments);
  }

  get applicationDetails() {
    return this.model?.data?.[0];
  }

  initializeStatusFlags() {
    if (this.applicationDetails) {
      const details = this.applicationDetails;
      this.isAccepted = details.status === this.statusTypes.accepted;
      this.isRejected = details.status === this.statusTypes.rejected;
      this.isPending = details.status === this.statusTypes.pending;

      this.feedback = details.feedback || '';
      if (this.isAccepted) {
        this.inviteLink = details.inviteLink || '';
      }
    } else {
      this.isAccepted = false;
      this.isRejected = false;
      this.isPending = false;
    }
  }

  @action
  updateRemarks(e) {
    this.remarks = e.target.value;
  }

  @action
  async approveRejectAction(status) {
    const initialApplicationDetails = this.model;

    const { isValid, data } = validateApplicationDetails(
      initialApplicationDetails,
    );

    if (!isValid || !data) {
      console.error('Invalid application details:', initialApplicationDetails);
      this.toast.error('Invalid application details.', 'Error!', TOAST_OPTIONS);
      return;
    }

    const applicationId = data.id;
    const body = { status, feedback: this.remarks };
    try {
      const response = await fetch(
        `${APPS.API_BACKEND}/applications/${applicationId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        console.error(
          'Failed to update application status. Response:',
          response,
        );
        this.toast.error(
          'Failed to update application status.',
          'Error!',
          TOAST_OPTIONS,
        );
        return;
      }

      if (status === this.statusTypes.accepted) {
        this.inviteLink = await this.onboarding.discordInvite();
        this.isAccepted = true;
        this.isRejected = false;
        this.isPending = false;
      } else if (status === this.statusTypes.rejected) {
        this.isRejected = true;
        this.isAccepted = false;
        this.isPending = false;
      } else if (status === this.statusTypes.pending) {
        this.isPending = true;
        this.isRejected = false;
        this.isAccepted = false;
      }

      console.log('Updated status flags:', {
        isAccepted: this.isAccepted,
        isRejected: this.isRejected,
        isPending: this.isPending,
      });

      this.toast.success(
        `Application ${status.toLowerCase()} successfully.`,
        'Success!',
        TOAST_OPTIONS,
      );
    } catch (error) {
      console.error('Error updating application status:', error);
      this.toast.error(
        'Something went wrong, please try again later.',
        'Error!',
        TOAST_OPTIONS,
      );
    }
  }

  @action
  copyToClipboard(link) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        this.toast.success(
          'Invite link copied to clipboard!',
          'Success!',
          TOAST_OPTIONS,
        );
      })
      .catch((err) => {
        console.error('Failed to copy the text: ', err);
        this.toast.error(
          'Failed to copy the link. Please try again.',
          'Error!',
          TOAST_OPTIONS,
        );
      });
  }
}
