import Component from '@glimmer/component';

export default class SignupStepsStepTwoComponent extends Component {
  get role() {
    const { role } = this.args;
    return role;
  }
}
