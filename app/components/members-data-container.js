import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

const noOfMembersToShow = 5;
export default class MembersDataContainerComponent extends Component {
  @service store;
  @service inViewport;

  @tracked members = [];

  allMembers = [];
  elementId = 'member-data-container';

  async loadMembers() {
    if (this.allMembers.length) {
      return;
    }
    // TODO: This is using users/search?role=member route, to be updated once the new route for members data is available
    const data = await this.store
      .query('user', {
        role: 'member',
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
    this.allMembers = data.toArray();
  }

  loadRandomMembers() {
    let membersData = this.allMembers;
    shuffle(membersData);
    this.members = membersData.slice(0, noOfMembersToShow);
  }

  @action
  setupInViewport() {
    const loader = document.getElementById(this.elementId);
    const viewportTolerance = { bottom: 100 };
    const { onEnter, onExit } = this.inViewport.watchElement(loader, {
      viewportTolerance,
    });
    onEnter(this.didEnterViewport.bind(this));
    onExit(this.didLeaveViewport.bind(this));
  }

  async didEnterViewport() {
    await this.loadMembers();
    this.loadRandomMembers();
  }

  didLeaveViewport() {
    this.members = [];
  }

  willDestroy() {
    const loader = document.getElementById(this.elementId);
    this.inViewport.stopWatching(loader);

    super.willDestroy(...arguments);
  }
}

function shuffle(array) {
  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
