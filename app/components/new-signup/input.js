import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LABEL_TEXT } from '../../constants/new-signup';

export default class SignupComponent extends Component {
  get label() {
    const { currentStep } = this.args;

    return LABEL_TEXT[currentStep];
  }

  @action inputFieldChanged({ target: { value } }) {
    const { onChange, currentStep } = this.args;
    onChange(currentStep, value);
  }
}
