import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the live header', async function (assert) {
    await render(hbs`<LiveHeader />`);

    assert.dom('[data-test-live="header"]').exists();
    assert.dom('[data-test-button="share"]').exists();
  });

  test('it should change the text when click', async function (assert) {
    await render(hbs`<LiveHeader />`);

    assert.dom('[data-test-button="share"]').exists();
    assert.dom('[data-test-button="share"]').hasText('Screenshare');

    await click('[data-test-button="share"]');

    assert.dom('[data-test-button="share"]').hasText('Stop sharing');
  });
});
