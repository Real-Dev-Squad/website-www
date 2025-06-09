import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ConfirmModalComponent extends Component {
  @action openConfirmModal() {
    this.showConfirmModal = true;
  }

  @action closeConfirmModal() {
    this.showConfirmModal = false;
  }
}
