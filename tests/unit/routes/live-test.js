import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Route | live', function (hooks) {
  setupTest(hooks);

  test('live exists!', function (assert) {
    let route = this.owner.lookup('route:live');
    assert.ok(route);
  });
});
