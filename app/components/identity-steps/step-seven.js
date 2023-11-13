import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { PROFILE_STATUS } from '../../constants/stepper-signup-data';

export default class IdentityStepsStepSevenComponent extends Component {
  @service login;
  @service router;

  PROFILE_STATUS = PROFILE_STATUS;

  currentProfileStatus = [
    {
      status: PROFILE_STATUS.PENDING,
      heading: 'Pending',
      icon: 'hourglass-half',
    },
    {
      status: PROFILE_STATUS.BLOCKED,
      heading: 'Blocked',
      icon: 'ban',
    },
  ];
}
