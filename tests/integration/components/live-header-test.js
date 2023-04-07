import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the live header', async function (assert) {
    await render(hbs`<LiveHeader />`);

    assert.dom('.live__header').exists();
    assert.dom('.live__header .btn.btn-share').exists();
  });

  test('it should change the text when click', async function (assert) {
    await render(hbs`<LiveHeader />`);

    assert.dom('.live__header .btn.btn-share').exists();
    assert.dom('.live__header .btn.btn-share').hasText('Screenshare');

    await click('.live__header .btn.btn-share');

    assert.dom('.live__header .btn.btn-share').hasText('Stop sharing');
  });
});
