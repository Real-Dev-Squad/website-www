import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | scroll-to-top', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ScrollToTop />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ScrollToTop>
        template block text
      </ScrollToTop>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
