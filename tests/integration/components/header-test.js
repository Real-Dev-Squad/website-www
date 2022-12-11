import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | header', function (hooks) {
  setupRenderingTest(hooks);

  test('header content renders', async function (assert) {
    await render(hbs`<Header />`);

    assert.dom('[data-test-logo]').exists();
    assert.dom('[data-test-subtitle]').hasText('Welcome to the');
    assert.dom('[data-test-title]').hasText('Real Dev Squad');
    assert.dom('[data-test-social-link]').exists({ count: 4 });
    assert.dom('[data-test-social-icon]').exists({ count: 4 });
    assert.dom('[data-test-welcome-img]').exists();
  });
});
