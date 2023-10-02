import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';

export default class IdentityStepsStepFourComponent extends Component {
  @service toast;
  @tracked Chaincode = 'Generate Chaincode';
  @tracked isChaincodeClicked = false;
  @tracked hideChaincode = true;
  @tracked isCopyClicked = false;
  @tracked isChaincodePageButtonDisabled = true;

  @action async handleGenerateChaincode(e) {
    e.preventDefault();
    this.Chaincode = 'hv2hz3xh1h';
    this.isChaincodeClicked = true;
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
