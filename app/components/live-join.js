import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveJoinComponent extends Component {
  @tracked name = '';

  @action inputHandler(e) {
    this.name = e.target.value;
  }

  @action clickHandler(e) {
    e.preventDefault();
    //TODO: Add funtionality to join live session
    if (this.name) {
      console.log('Join as', this.name);
      this.name = '';
    }
  }
}
