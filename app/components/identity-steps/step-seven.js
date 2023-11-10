import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IdentityStepsStepSevenComponent extends Component {
  @service identityService;
  @service login;

  @action handleRefresh() {
    this.identityService.reload();
  }
}
