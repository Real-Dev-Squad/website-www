import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | unauthorized', function (hooks) {
  setupRenderingTest(hooks);

  test('unauthorized component renders', async function (assert) {
    await render(hbs`<Unauthorized />`);

    assert
      .dom('[data-test-img]')
      .hasAttribute('src', '/assets/images/errors/401.svg')
      .hasAttribute('alt', 'Unauthorized');
    assert
      .dom('[data-test-text]')
      .hasText('You are not authorized to view this page');
  });
});
