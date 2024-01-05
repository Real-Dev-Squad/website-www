import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';

export default class IdentityStepsStepFourComponent extends Component {
  @service toast;
  @tracked hideChaincode = true;
  @tracked isCopyClicked = false;
  @tracked isChaincodePageButtonDisabled = true;
  @tracked isTooltipVisible = true;

  @action toggleEye() {
    this.hideChaincode = !this.hideChaincode;
  }

  @action handleCopy() {
    navigator.clipboard.writeText(this.Chaincode);
    this.isCopyClicked = true;
    this.isTooltipVisible = false;
    this.isChaincodePageButtonDisabled = false;
    if (this.isCopyClicked === true) {
      this.toast.info('Copied', '', toastNotificationTimeoutOptions);
    }
  }
}
