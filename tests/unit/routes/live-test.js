import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { visit } from '@ember/test-helpers';

module('Unit | Route | live', function (hooks) {
  setupTest(hooks);
  // TODO - remove tests for dev mode when it goes to prod
  test('it exists', function (assert) {
    let route = this.owner.lookup('route:live');
    assert.ok(route);
  });

  test('visiting /live', async function (assert) {
    await visit('/live?dev=true');
    assert.expect(3);

    assert.dom('[data-test-card]').exists();
    assert.dom('[data-test-input-field]').exists();
    assert.dom('[data-test-button="live-join"]').exists();
  });
});
