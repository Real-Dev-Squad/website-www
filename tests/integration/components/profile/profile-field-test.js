import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | profile/profile-field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Profile::ProfileField />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Profile::ProfileField>
        template block text
      </Profile::ProfileField>
    `);

    assert.dom().hasText('template block text');
  });
});
