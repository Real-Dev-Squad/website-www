import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import checkURL from '../../utils/check-url';

export default class IdentityStepsStepFiveComponent extends Component {
  @tracked isMouseOnTooltip = false;
  @tracked profileURL = '';
  @tracked nextButtonDisabled = true;
  @tracked isLoading = false;

  @action openTooltipInfo() {
    this.isMouseOnTooltip = true;
  }

  @action closeTooltipInfo() {
    this.isMouseOnTooltip = false;
  }

  @action changeProfileURL(e) {
    this.profileURL = e.target.value;
    if (this.profileURL === '' || !checkURL(this.profileURL)) {
      this.nextButtonDisabled = true;
    } else {
      this.nextButtonDisabled = false;
    }
  }

  @action handleEdit(e) {
    e.preventDefault();
    this.args.startHandler();
    this.isLoading = true;
    this.isLoading = false;
  }
}
