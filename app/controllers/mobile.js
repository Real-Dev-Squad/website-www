import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { ERROR_MESSAGES } from '../constants/error-messages';
import {
  AUTH_STATUS,
  MOBILE_LOGIN_SUCCESS_MESSAGE,
  QR_SCAN_CONFIRMATION_MESSAGE,
  QR_SCAN_MESSAGE,
  REQUEST_CANCEL_MESSAGE,
} from '../constants/auth-status';
import {
  QR_AUTHORIZATION_STATUS_URL,
  USER_AUTHENTICATED_DEVICES_URL,
} from '../constants/apis';
import { TOAST_OPTIONS } from '../constants/toast-options';
import apiRequest from '../utils/api-request';

export default class MobileController extends Controller {
  @service toast;
  @service router;

  async updateQRAuthStatus(status, successMessage) {
    try {
      const response = await apiRequest(
        `${QR_AUTHORIZATION_STATUS_URL}/${status}`,
        'PATCH',
      );

      if (!response || response.status !== 200) {
        throw new Error(ERROR_MESSAGES.somethingWentWrong);
      }
      this.toast.success(successMessage, 'Success');
      if (status === AUTH_STATUS.AUTHORIZED) {
        this.router.transitionTo('/');
      }
    } catch (error) {
      this.toast.error(
        ERROR_MESSAGES.somethingWentWrong,
        'Error!',
        TOAST_OPTIONS,
      );
    }
  }

  @action async confirmQRAuth() {
    if (confirm(QR_SCAN_CONFIRMATION_MESSAGE)) {
      await this.updateQRAuthStatus(
        AUTH_STATUS.AUTHORIZED,
        MOBILE_LOGIN_SUCCESS_MESSAGE,
      );
    } else {
      await this.updateQRAuthStatus(
        AUTH_STATUS.REJECTED,
        REQUEST_CANCEL_MESSAGE,
      );
    }
  }

  @action async getQRScannedDevices() {
    try {
      const response = await apiRequest(USER_AUTHENTICATED_DEVICES_URL, 'GET');
      if (response.status === 200) {
        await this.confirmQRAuth();
      } else {
        this.toast.error(QR_SCAN_MESSAGE, 'Not verified', TOAST_OPTIONS);
      }
    } catch (error) {
      this.toast.error(
        ERROR_MESSAGES.somethingWentWrong,
        'Error!',
        TOAST_OPTIONS,
      );
    }
  }
}
