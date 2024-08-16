import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { APPLICATION_STATUS_TYPES } from '../../constants/join';

export default class StatusCardComponent extends Component {
  @service login;
  @service router;

  APPLICATION_STATUS_TYPES = APPLICATION_STATUS_TYPES;

  APPLICATION_STATUSES = [
    {
      status: APPLICATION_STATUS_TYPES.pending,
      heading: 'Pending',
      icon: 'hourglass-half',
    },
    {
      status: APPLICATION_STATUS_TYPES.rejected,
      heading: 'Rejected',
      icon: 'ban',
    },
    {
      status: APPLICATION_STATUS_TYPES.accepted,
      heading: 'Accepted',
      icon: 'square-check',
    },
  ];
  @action redirectToHome() {
    this.router.transitionTo('/');
  }
}
