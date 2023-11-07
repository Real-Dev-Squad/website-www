import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class JoinSection extends Component {
  @service featureFlag;

  get isDevMode() {
    return this.featureFlag.isDevMode;
  }
}
