import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { ANKUSH_TWITTER, APPS } from '../constants/urls';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class JoinController extends Controller {
  @service router;
  @service login;
  @service featureFlag;
  @tracked chaincode = 'Generate chaincode';
  @tracked isChaincodeClicked = false;
  @tracked isLoading = false;
  ANKUSH_TWITTER = ANKUSH_TWITTER;

  queryParams = ['step', 'dev'];

  get isDevMode() {
    return this.featureFlag.isDevMode;
  }

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

      if (!response.ok)
        return this.toast.error(
          'Something went wrong. Please check console errors.',
          '',
          TOAST_OPTIONS,
        );

      this.chaincode = chaincode;
      this.isChaincodeClicked = true;
      this.toast.info('Generated New Chaincode!!', '', TOAST_OPTIONS);
    } catch (error) {
      this.toast.error(
        'Something went wrong. Please check console errors.',
        '',
        TOAST_OPTIONS,
      );
    } finally {
      this.isLoading = false;
    }
  }
}
