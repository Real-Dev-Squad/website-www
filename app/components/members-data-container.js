import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class MembersDataContainerComponent extends Component {
  @service store;

  @tracked members = [];
  // Currently not getting members DATA
  @action async loadMembers() {
    const data = await this.store
      .query('user', {
        size: 5,
        next: 'QgFqr4RXYUEN8TB3LuVu', // Random id to be removed before merging
      })
      .catch((err) => console.error(err));
    this.members = data;
  }
}
