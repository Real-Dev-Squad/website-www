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
      icon: 'mdi:timer-sand',
    },
    {
      status: APPLICATION_STATUS_TYPES.rejected,
      heading: 'Rejected',
      icon: 'mdi:close-circle',
    },
    {
      status: APPLICATION_STATUS_TYPES.accepted,
      heading: 'Accepted',
      icon: 'mdi:check-circle',
    },
  ];
}
