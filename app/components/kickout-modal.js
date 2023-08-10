import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class KickoutModalComponent extends Component {
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
