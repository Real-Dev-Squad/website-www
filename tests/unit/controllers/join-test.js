import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Controller | join', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:join');
    assert.ok(controller);
  });

  test('it has queryParams', function (assert) {
    let controller = this.owner.lookup('controller:join');
    assert.deepEqual(controller.queryParams, ['step', 'dev']);
  });
});
