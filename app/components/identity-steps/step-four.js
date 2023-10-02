import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IdentityStepsStepFourComponent extends Component {
  @tracked Chaincode = 'Generate Chaincode';
  @tracked isChaincodeClicked = false;
  @tracked hideChaincode = true;

  @action async handleGenerateChaincode(e) {
    e.preventDefault();
    this.Chaincode = '12345678910';
    this.isChaincodeClicked = true;
  }

  @action toggleEye() {
    this.hideChaincode = !this.hideChaincode;
  }
}
