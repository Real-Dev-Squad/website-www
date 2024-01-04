import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Route | join', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:join');
    assert.ok(route);
  });
});
