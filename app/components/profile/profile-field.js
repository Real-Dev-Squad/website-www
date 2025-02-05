import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ProfileFieldComponent extends Component {
  @action
  inputFieldChanged(event) {
    const { id, onChange } = this.args;
    const value = event.target.value;

    onChange(id, value);
  }

  @action
  checkInputValidation(event) {
    const { id, onBlur } = this.args;
    let isValid = event.target.validity.valid;

    onBlur(id, isValid);
  }
}
