import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Route | status', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:status');
    assert.ok(route);
  });
});
