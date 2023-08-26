import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-participants', function (hooks) {
  setupRenderingTest(hooks);
  test('renders No Maven In the stream Text', async function (assert) {
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
      ],
      profilePic: 'profilepicurl',
      isKickoutModalOpen: true,
    });
    this.set('openKickoutModal', () => {
      this.isKickoutModalOpen = true;
    });
    await render(hbs`<LiveParticipants
      @user='Mavens'
      @role='maven'
      @peers={{this.peers}}
      @minimumParticipants=""
      @openKickoutModal={{this.openKickoutModal}}
    />`);
    assert
      .dom('[data-test-sidebar-body-role] .user')
      .hasText('No Mavens in the stream');
  });
  test('renders No Moderators In the stream Text', async function (assert) {
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
      ],
      profilePic: 'profilepicurl',
      isKickoutModalOpen: true,
    });
    this.set('openKickoutModal', () => {
      this.isKickoutModalOpen = true;
    });
    await render(hbs` <LiveParticipants
      @user='Moderators'
      @role='moderator'
      @peers={{this.peers}}
      @minimumParticipants=""
      @openKickoutModal={{this.openKickoutModal}}
    />`);
    assert
      .dom('[data-test-sidebar-body-role] .user')
      .hasText('No Moderators in the stream');
  });
  test('renders No Guests In the stream Text', async function (assert) {
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
      ],
      profilePic: 'profilepicurl',
      isKickoutModalOpen: true,
    });
    this.set('openKickoutModal', () => {
      this.isKickoutModalOpen = true;
    });
    await render(hbs`  <LiveParticipants
      @user='Guests'
      @role='guest'
      @peers={{@peers}}
      @minimumParticipants=""
      @openKickoutModal={{this.openKickoutModal}}
    />`);
    assert
      .dom('[data-test-sidebar-body-role] .user')
      .hasText('No Guests in the stream');
  });
  test('renders Mavens Lists who joined Stream', async function (assert) {
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
        {
          id: 2,
          name: 'Maven1',
          roleName: 'maven',
        },
        {
          id: 3,
          name: 'Maven2',
          roleName: 'maven',
        },
      ],
      profilePic: 'profilepicurl',
      isKickoutModalOpen: true,
    });
    this.set('openKickoutModal', () => {
      this.isKickoutModalOpen = true;
    });
    await render(hbs`<LiveParticipants
      @user='Mavens'
      @role='maven'
      @peers={{this.peers}}
      @minimumParticipants="maven"
      @openKickoutModal={{this.openKickoutModal}}
    />`);
    assert.dom('[data-test-sidebar-user="2"]').hasText('Maven1');
  });
  test('renders Moderators Lists who joined Stream', async function (assert) {
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
        {
          id: 2,
          name: 'Mod1',
          roleName: 'moderator',
        },
        {
          id: 3,
          name: 'Mod3',
          roleName: 'moderator',
        },
      ],
      profilePic: 'profilepicurl',
      isKickoutModalOpen: true,
    });
    this.set('openKickoutModal', () => {
      this.isKickoutModalOpen = true;
    });
    await render(hbs`<LiveParticipants
      @user='Moderator'
      @role='moderator'
      @peers={{this.peers}}
      @minimumParticipants="moderator"
      @openKickoutModal={{this.openKickoutModal}}
    />`);
    assert.dom('[data-test-sidebar-user="3"]').hasText('Mod3');
  });
  test('renders Guests Lists who joined Stream', async function (assert) {
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
        {
          id: 2,
          name: 'Guest1',
          roleName: 'guest',
        },
        {
          id: 3,
          name: 'Guest2',
          roleName: 'guest',
        },
      ],
      profilePic: 'profilepicurl',
      isKickoutModalOpen: true,
    });
    this.set('openKickoutModal', () => {
      this.isKickoutModalOpen = true;
    });
    await render(hbs`<LiveParticipants
      @user='Guest'
      @role='guest'
      @peers={{this.peers}}
      @minimumParticipants="guest"
      @openKickoutModal={{this.openKickoutModal}}
    />`);
    assert.dom('[data-test-sidebar-user="3"]').hasText('Guest2');
  });
});
