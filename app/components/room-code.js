import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class RoomCodeComponent extends Component {
  @tracked isVisible = false;
  @tracked isCopied = false;
  HIDE_PATTERN = '***********************************';

  @action visibilityHandler() {
    this.isVisible = !this.isVisible;
  }

  @action async copyHandler(code) {
    try {
      await navigator.clipboard.writeText(`${code}`);
      this.isCopied = true;
      this.args.toast.success(
        'Copied room code for maven!',
        'Success!',
        TOAST_OPTIONS
      );
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    } catch (error) {
      this.isCopied = false;
      console.error(error);
    }
  }
}
