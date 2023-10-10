import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';
import { APPS } from '../../constants/urls';

export default class IdentityStepsStepFourComponent extends Component {
  @service toast;
  @tracked Chaincode = 'Generate Chaincode';
  @tracked isChaincodeClicked = false;
  @tracked hideChaincode = true;
  @tracked isCopyClicked = false;
  @tracked isChaincodePageButtonDisabled = true;
  @tracked isLoading = false;

  @action async handleGenerateChaincode(e) {
    e.preventDefault();

    this.isLoading = true;

    try {
      const response = await fetch(`${APPS.API_BACKEND}/users/chaincode`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const { chaincode } = await response.json();

      if (response.ok) {
        this.Chaincode = chaincode;
        this.isChaincodeClicked = true;
        this.toast.info(
          'Generated New Chaincode!!',
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
    }
  }

  @action toggleEye() {
    this.hideChaincode = !this.hideChaincode;
  }

  @action handleCopy() {
    navigator.clipboard.writeText(this.Chaincode);
    this.isCopyClicked = true;
    this.isChaincodePageButtonDisabled = false;
    if (this.isCopyClicked === true) {
      this.toast.info('Copied', '', toastNotificationTimeoutOptions);
    }
  }
}
