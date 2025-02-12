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
import { FETCH_AUTH_STATUS, FETCH_DEVICE_INFO } from '../constants/apis';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class MobileController extends Controller {
  @service toast;
  @service router;

  async fetchAuthStatus(authStatus) {
    const response = await fetch(`${FETCH_AUTH_STATUS}/${authStatus}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return response;
  }

  @action async verifyAuth() {
    if (confirm(QR_SCAN_CONFIRMATION_MESSAGE)) {
      try {
        const checkStatus = await this.fetchAuthStatus(AUTH_STATUS.AUTHORIZED);
        if (checkStatus.status !== 200) {
          throw Error(ERROR_MESSAGES.somethingWentWrong);
        }
        this.router.transitionTo('/');
        this.toast.success(MOBILE_LOGIN_SUCCESS_MESSAGE, 'Success');
      } catch (error) {
        this.toast.error(ERROR_MESSAGES.somethingWentWrong, '', TOAST_OPTIONS);
      }
    } else {
      try {
        const checkStatus = await this.fetchAuthStatus(AUTH_STATUS.REJECTED);
        if (checkStatus.response.status !== 200) {
          throw Error(ERROR_MESSAGES.somethingWentWrong);
        }
        this.toast.success(REQUEST_CANCEL_MESSAGE, 'Success');
      } catch (error) {
        this.toast.error(ERROR_MESSAGES.somethingWentWrong, '', TOAST_OPTIONS);
      }
    }
  }

  @action async buttonClicked() {
    try {
      const response = await fetch(FETCH_DEVICE_INFO, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        this.toast.error(QR_SCAN_MESSAGE, 'Not verified', TOAST_OPTIONS);
      }
      await this.verifyAuth();
    } catch (error) {
      this.toast.error('error');
    }
  }
}
