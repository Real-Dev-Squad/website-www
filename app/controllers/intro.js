import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { APPS } from '../constants/urls';
import { validateApplicationDetails } from '../utils/validate-application-details';
import { APPLICATION_STATUS_TYPES } from '../constants/application';

export default class IntroController extends Controller {
  @service login;
  @tracked remarks = '';
  statusTypes = APPLICATION_STATUS_TYPES;

  @action
  updateRemarks(e) {
    const value = e.currentTarget.value;
    this.remarks = value;
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

      if (!response.ok || response.status >= 400) {
        alert('Failed to update application status.');
        return;
      }

      alert(`Application ${status.toLowerCase()} successfully.`);
    } catch (error) {
      alert('Something went wrong, please try again later.');
      console.error('Error :', error);
    }
  }
}
