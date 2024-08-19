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
  @tracked feedback = '';
  statusTypes = APPLICATION_STATUS_TYPES;

  constructor() {
    super(...arguments);
    this.initializeStatusFlags();
  }

  initializeStatusFlags() {
    const applicationDetails = this.model?.[0];
    if (applicationDetails) {
      this.isRejected = applicationDetails.status === this.statusTypes.rejected;
      this.isAccepted = applicationDetails.status === this.statusTypes.accepted;
      this.feedback = applicationDetails.feedback;

      if (this.isAccepted) {
        this.inviteLink =
          this.onboarding.inviteLink || applicationDetails.inviteLink;
      }
    }
  }

  @action
  updateRemarks(e) {
    this.remarks = e.target.value;
  }

  @action
  async approveRejectAction(status) {
    const initialApplicationDetails = this.model?.[0];

    const { isValid, data } = validateApplicationDetails(
      initialApplicationDetails,
    );

    if (!isValid || !data) {
      alert('Invalid application details.');
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
        alert('Failed to update application status.');
        return;
      }

      if (status === this.statusTypes.accepted) {
        this.inviteLink = await this.onboarding.discordInvite();
        this.isAccepted = true;
      } else if (status === this.statusTypes.rejected) {
        this.isRejected = true;
      }

      alert(`Application ${status.toLowerCase()} successfully.`);
    } catch (error) {
      alert('Something went wrong, please try again later.');
      console.error('Error :', error);
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
