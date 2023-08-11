import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-sidebar', function (hooks) {
  setupRenderingTest(hooks);

  test('live-sidebar renders', async function (assert) {
    assert.expect(17);
    this.setProperties({
      peers: [
        {
          id: 1,
          name: 'Ankush',
          roleName: 'host',
        },
        {
          id: 2,
          name: 'Satyam',
          roleName: 'guest',
        },
      ],
      profilePic: 'profilepicurl',
    });
    await render(hbs`<LiveSidebar 
    @peers={{this.peers}}
    @hostProfilePicture={{this.profilePic}}
    />`);

    assert.dom('[data-test-sidebar]').exists();
    assert.dom('[data-test-sidebar-participants]').exists();
    assert.dom('[data-test-sidebar-button]').exists();
    assert.dom('[data-test-sidebar-body]').exists();
    assert.dom('[data-test-sidebar-body-host]').exists();
    assert.dom('[data-test-sidebar-host-container]').exists();

    assert.dom('[data-test-sidebar-host-image]').exists();
    assert.dom('[data-test-sidebar-host-image]').hasAttribute('alt');
    assert.dom('[data-test-sidebar-host-image]').hasAttribute('src');
    assert.strictEqual(
      document
        .querySelector(`[data-test-sidebar-host-image]`)
        .getAttribute('src'),
      this.profilePic,
      'profile pic is same!'
    );

    assert.dom('[data-test-sidebar-host-name]').exists();
    assert.dom('[data-test-sidebar-host-name]').hasText('Ankush is presenting');

    assert.dom('[data-test-sidebar-body-role]').exists();

    assert.dom('[data-test-sidebar-body-role-guest]').exists();
    assert.dom('[data-test-sidebar-body-role-guest]').hasText('Guest Users');

    assert.dom('[data-test-sidebar-user="2"]').exists();
    assert.strictEqual(
      document.querySelector(`[data-test-sidebar-user="2"]`).innerText,
      this.peers[1].name,
      'guest name is same!'
    );
  });
});
