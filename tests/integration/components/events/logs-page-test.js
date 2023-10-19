import { module, skip } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | logs-page', function (hooks) {
  setupRenderingTest(hooks);

  skip('it renders Events::LogsPage', async function (assert) {
    await render(hbs`
      <Events::LogsPage />
    `);

    assert.true(true);
  });
});
