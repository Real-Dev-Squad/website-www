import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Controller | join', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:join');
    assert.ok(controller);
  });
});
