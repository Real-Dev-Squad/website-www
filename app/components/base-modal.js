import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BaseModal extends Component {
  @action closeModal() {
    this.args.closeModal();
  }

  @action openModal() {
    this.args.openModel();
  }
}
