import Component from '@glimmer/component';
// import { APPS } from '../../constants/urls';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
// import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';
// import { inject as service } from '@ember/service';

export default class IdentityStepsStepFourComponent extends Component {
  //   @service toast;
  @tracked Chaincode = 'Generate Chaincode';
  @tracked isChaincodeClicked = false;
  @tracked hideChaincode = true;

  @action async handleGenerateChaincode(e) {
    e.preventDefault();
    this.Chaincode = '1234';
    this.isChaincodeClicked = true;
    // try {
    //   const response = await fetch(`${APPS.API_BACKEND}/users/chaincode`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //   });

    //   const { chaincode } = await response.json();

    //   if (response.ok) {
    //     this.Chaincode = chaincode;
    //     // this.isChaincodeClicked = true;
    //     this.toast.info(
    //       'Generated New Chaincode!!',
    //       '',
    //       toastNotificationTimeoutOptions
    //     );
    //   } else {
    //     this.toast.error(
    //       'Something went wrong. Please check console errors.',
    //       '',
    //       toastNotificationTimeoutOptions
    //     );
    //   }
    // } catch (error) {
    //   this.toast.error(
    //     'Something went wrong. Please check console errors.',
    //     '',
    //     toastNotificationTimeoutOptions
    //   );
    // }
  }

  @action toggleEye() {
    this.hideChaincode = !this.hideChaincode;
  }
}
