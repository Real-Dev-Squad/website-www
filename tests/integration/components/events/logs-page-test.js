import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | events/logs-page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders Events::LogsPage', async function (assert) {
    await render(hbs`
      <Events::LogsPage />
    `);
    assert.dom('[data-test-logs-page-container]').exists();
    assert.dom('[data-test-logs-heading]').exists();
    assert.dom('[data-test-logs-main]').exists();
    assert.dom('[data-test-log-card]').exists();

    // TODO : will add tests for this when we integrate API to this
    // data-test-log-card-time='{{data.id}}'
    // data-test-log-card-removed-peer='{{data.id}}'
    // data-test-log-card='{{data.id}}'
    // data-test-log-removed-by='{{data.id}}'
  });
});
