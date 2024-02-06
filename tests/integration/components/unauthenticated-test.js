import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | unauthenticated', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Unauthenticated />`);

    assert.dom('[data-test-unauthenticated]').exists();
    assert.dom('[data-test-unauthenticated-img]').exists();
    assert
      .dom('[data-test-unauthenticated-text]')
      .hasText(
        'You are not authenticated to view this page. Please Sign In to view this page.',
      );
  });
});
