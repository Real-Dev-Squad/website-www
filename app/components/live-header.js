import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LiveHeaderComponent extends Component {
  @action clickHandler() {
    console.log('Dummy click handler');
  }
}
