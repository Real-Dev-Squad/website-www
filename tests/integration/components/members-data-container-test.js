import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | members-data-container', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Write this test after having some way to mock api calls
  test.skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MembersDataContainer />`);

    assert.dom(this.element).hasText('');
  });
});
