import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveHeaderComponent extends Component {
  @tracked isTabOpen = false;

  @action toggleTabs() {
    this.isTabOpen = !this.isTabOpen;
  }
}
