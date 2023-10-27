import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

const noOfMembers = 6;
export default class MembersDataContainerComponent extends Component {
  @service store;

  @tracked members = [];

  @action async loadMembers() {
    // TODO: This is using users/search?role=member route, to be updated once the new route for members data is available
    const data = await this.store
      .query('user', {
        role: 'member',
      })
      .catch((err) => console.error(err));
    let membersData = data.toArray();
    shuffle(membersData);
    this.members = membersData.slice(0, noOfMembers);
  }
}

function shuffle(array) {
  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
