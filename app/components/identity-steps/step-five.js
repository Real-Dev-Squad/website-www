import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IdentityStepsStepFiveComponent extends Component {
  @tracked isMouseOnTooltip = false;

  @action openTooltipInfo() {
    this.isMouseOnTooltip = true;
  }

  @action closeTooltipInfo() {
    this.isMouseOnTooltip = false;
  }

  @action changeProfileURL() {
    console.log('18');
  }
}
