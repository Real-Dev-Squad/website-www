import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { PROFILE_STATUS } from '../../constants/stepper-signup-data';

export default class IdentityStepsStepSevenComponent extends Component {
  @service login;
  @service router;

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
    {
      status: PROFILE_STATUS.VERIFIED,
      heading: 'Successful',
      icon: 'square-check',
    },
  ];
}
