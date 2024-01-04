import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-roles', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<LiveRoles />`);

    assert.dom('[data-test-live-roles-card]').exists();
    assert.dom('[data-test-live-roles-card-title]').exists();
  });
});
