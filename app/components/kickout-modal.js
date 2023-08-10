import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class KickoutModalComponent extends Component {
  @tracked peer = 'guest 1';

  @action clickHandler(e) {
    e.stopPropagation();
  }

  @action
  closeModal() {
    this.args.closeModal();
  }

  @action removePeer() {
    this.args.removePeer();
  }
}
