import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveHeaderComponent extends Component {
  @tracked isSharing = false;

  @action toggleShare() {
    this.isSharing = !this.isSharing;
  }
}
