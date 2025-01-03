import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-status', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<UserStatus />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <UserStatus>
        template block text
      </UserStatus>
    `);

    assert.dom().hasText('template block text');
  });
});
