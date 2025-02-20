import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { ERROR_MESSAGES } from '../constants/error-messages';
import {
  AUTH_STATUS,
  MOBILE_LOGIN_SUCCESS_MESSAGE,
  QR_SCAN_CONFIRMATION_MESSAGE,
  QR_SCAN_MESSAGE,
  REQUEST_CANCEL_MESSAGE,
} from '../constants/auth-status';
import { AUTH_STATUS_ENDPOINT, FETCH_DEVICE_INFO } from '../constants/apis';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class MobileController extends Controller {
  @service toast;
  @service router;

  async fetchAuthStatus(authStatus) {
    try {
      const response = await fetch(`${AUTH_STATUS_ENDPOINT}/${authStatus}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return response;
    } catch (error) {
      this.toast.error(ERROR_MESSAGES.somethingWentWrong, '', TOAST_OPTIONS);
    }
  }

  async handleAuthStatus(status, successMessage) {
    try {
      const response = await this.fetchAuthStatus(status);
      if (!response || response.status !== 200) {
        throw new Error(ERROR_MESSAGES.somethingWentWrong);
      }
      this.toast.success(successMessage, 'Success');
      if (status === AUTH_STATUS.AUTHORIZED) {
        this.router.transitionTo('/');
      }
    } catch (error) {
      this.toast.error(ERROR_MESSAGES.somethingWentWrong, '', TOAST_OPTIONS);
    }
  }

  @action async verifyAuth() {
    if (confirm(QR_SCAN_CONFIRMATION_MESSAGE)) {
      await this.handleAuthStatus(
        AUTH_STATUS.AUTHORIZED,
        MOBILE_LOGIN_SUCCESS_MESSAGE,
      );
    } else {
      await this.handleAuthStatus(AUTH_STATUS.REJECTED, REQUEST_CANCEL_MESSAGE);
    }
  }

  @action async verifyBtnClicked() {
    try {
      const response = await fetch(FETCH_DEVICE_INFO, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status === 200) {
        await this.verifyAuth();
      } else this.toast.error(QR_SCAN_MESSAGE, 'Not verified', TOAST_OPTIONS);
    } catch (error) {
      this.toast.error('error');
    }
  }
}
