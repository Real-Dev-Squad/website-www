import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/blocked', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the initial state correctly', async function (assert) {
    await render(hbs`<Identity::Blocked />`);

    assert.dom('[data-test-blocked-heading]').hasText('Status Blocked');
    assert.dom('[data-test-blocked-desc]').exists();
    assert.dom('[data-test-blocked-button]').hasText('Retry');
  });

  test('it handles retry button click', async function (assert) {
    let retryClicked = false;
    this.set('setState', () => (retryClicked = true));
    await render(hbs`<Identity::Blocked @setState={{this.setState}} />`);

    await click('[data-test-blocked-button]');

    assert.true(retryClicked, 'Retry button should trigger setState');
  });
});
