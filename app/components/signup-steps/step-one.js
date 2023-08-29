import Component from '@glimmer/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { JOIN_DEBOUNCE_TIME } from '../../constants/join';

export default class SignupStepsStepOneComponent extends Component {
  @action inputHandler(e) {
    const { onChange } = this.args;
    const setValToLocalStorage = () => {
      onChange(e.target.name, e.target.value);
    };

    debounce(setValToLocalStorage, JOIN_DEBOUNCE_TIME);
  }
}
