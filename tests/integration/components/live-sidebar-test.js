import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-sidebar', function (hooks) {
  setupRenderingTest(hooks);

  test('live-sidebar renders', async function (assert) {
    assert.expect(12);
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
      '/assets/images/profile.png',
      'profile pic is same!'
    );

    assert.dom('[data-test-sidebar-host-name]').exists();
    assert.dom('[data-test-sidebar-host-name]').hasText('No one is presenting');
  });
});
