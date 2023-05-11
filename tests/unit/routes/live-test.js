import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { visit } from '@ember/test-helpers';

module('Unit | Route | live', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:live');
    assert.ok(route);
  });

  test('visiting /live', async function (assert) {
    await visit('/live?dev=true');
    assert.expect(2);

    assert.dom('[data-test-live]').exists();
    assert.dom('[data-test-video-container]').exists();
  });
});
