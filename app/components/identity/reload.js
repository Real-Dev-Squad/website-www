import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ReloadComponent extends Component {
  @action async handleReload(e) {
    e.preventDefault();
    window.location.reload();
  }
}
