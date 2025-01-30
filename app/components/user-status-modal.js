import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  WARNING_MESSAGE_FOR_IDLE,
  WARNING_MESSAGE_FOR_OOO,
  WARNING_MESSAGE_FOR_FROM_FIELD,
  WARNING_MESSAGE_FOR_UNTIL_FIELD,
  USER_STATES,
  WARNING_FROM_DATE_EXCEEDS_UNTIL_DATE,
  THREE_DAYS_TIME_DIFFERENCE_MS,
  FROM_DATE,
  UNTIL_DATE,
  REASON,
} from '../constants/user-status';
import {
  getCurrentDateString,
  getUTCMidnightTimestampFromDate,
} from '../utils/date-conversion';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class UserStatusModalComponent extends Component {
  @service toast;
  @service featureFlag;
  @tracked currentStatus;
  @tracked fromDate = '';
  @tracked untilDate = '';
  @tracked reason = '';
  @tracked disableSubmitButton = true;
  @tracked disableDatesPrior = getCurrentDateString();

  @action
  updateValue(event) {
    const { name, value } = event.target;
    if (name === FROM_DATE) {
      this.fromDate = value;
    } else if (name === UNTIL_DATE) {
      this.untilDate = value;
    } else if (name === REASON) {
      this.reason = value;
    }
    this.checkSubmitBtnState();
  }

  @action
  async getCurrentStatusObj() {
    let from;
    let until;
    const isDevMode = this.featureFlag.isDevMode;

    if (this.args.newStatus === USER_STATES.OOO) {
      if (!this.validateOOOInputs()) return false;
      from = getUTCMidnightTimestampFromDate(this.fromDate);
      until = getUTCMidnightTimestampFromDate(this.untilDate);
    } else if (this.args.newStatus === USER_STATES.IDLE) {
      const currentDateString = getCurrentDateString();
      from = getUTCMidnightTimestampFromDate(currentDateString);
      if (!this.reason.length) {
        this.toast.error(WARNING_MESSAGE_FOR_IDLE, '', TOAST_OPTIONS);
        return;
      }
    }
    const updatedAt = Date.now();
    const newStateObj = {
      updatedAt,
      from,
      until,
      message: this.reason,
      state: this.args.newStatus,
    };
    await this.updateStatusBasedOnMode(isDevMode, newStateObj);
    this.resetInputFields();
    this.disableSubmitButton = true;
  }

  validateOOOInputs() {
    if (!this.fromDate) {
      this.toast.error(WARNING_MESSAGE_FOR_FROM_FIELD, '', TOAST_OPTIONS);
      return false;
    }
    if (!this.untilDate) {
      this.toast.error(WARNING_MESSAGE_FOR_UNTIL_FIELD, '', TOAST_OPTIONS);
      return false;
    }
    if (this.untilDate < this.fromDate) {
      this.toast.error(WARNING_FROM_DATE_EXCEEDS_UNTIL_DATE, '', TOAST_OPTIONS);
      return false;
    }
    if (!this.reason.length && !this.checkIfFromToDatesAreClose()) {
      this.toast.error(WARNING_MESSAGE_FOR_OOO, '', TOAST_OPTIONS);
      return false;
    }
    return true;
  }

  async updateStatusBasedOnMode(isDevMode, newStateObj) {
    if (isDevMode) {
      await this.args.statusUpdateForDev(
        this.fromDate,
        this.untilDate,
        this.reason,
      );
    } else {
      await this.args.updateStatus({ currentStatus: newStateObj });
    }
  }

  @action
  handleInput(event) {
    const { value } = event.target;
    this.reason = value;
    this.checkSubmitBtnState();
  }

  @action
  checkSubmitBtnState() {
    this.disableSubmitButton = true;
    if (this.checkIfFromToDatesAreClose()) {
      this.disableSubmitButton = false;
    } else if (
      this.fromDate !== '' &&
      this.untilDate !== '' &&
      this.reason !== ''
    ) {
      this.disableSubmitButton = false;
    }
  }

  @action
  checkIfFromToDatesAreClose() {
    if (this.fromDate && this.untilDate) {
      let from = new Date(this.fromDate.replaceAll('-', ',')).getTime();
      let until = new Date(this.untilDate.replaceAll('-', ',')).getTime();
      const timeGap = until - from;
      return timeGap <= THREE_DAYS_TIME_DIFFERENCE_MS;
    }
    return false;
  }

  @action
  resetInputFields() {
    this.fromDate = '';
    this.untilDate = '';
    this.reason = '';
  }

  @action
  onCancelModal() {
    this.resetInputFields();
    this.args.toggleUserStateModal();
  }
}
