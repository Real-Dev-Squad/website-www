import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RoomCodeModalComponent extends Component {
  @tracked isOptionOpen = false;

  @action toggleOptions() {
    this.isOptionOpen = !this.isOptionOpen;
  }

  @action clickHandler(e) {
    e.stopPropagation();
  }

  @action
  closeModal() {
    this.isOptionOpen = false;
    this.args.closeModal();
  }
}
