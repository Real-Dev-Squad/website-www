import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | debug', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DebugGrids />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <DebugGrids>
        template block text
      </DebugGrids>
    `);

    assert.dom().hasText('template block text');
  });
});
