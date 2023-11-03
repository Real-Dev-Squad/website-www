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
    assert.ok(true);
  });
});
