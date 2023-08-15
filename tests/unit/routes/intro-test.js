import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Route | intro', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:intro');
    assert.ok(route);
  });
});
