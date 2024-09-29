import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Route | subscribe', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:subscribe');
    assert.ok(route);
  });

  test('model hook returns undefined', function (assert) {
    let route = this.owner.lookup('route:subscribe');
    assert.strictEqual(
      route.model(),
      undefined,
      'model hook should return undefined',
    );
  });

  // Add more tests as needed for any future functionality
});
