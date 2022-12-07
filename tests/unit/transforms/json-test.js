import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Transform | json', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let transform = this.owner.lookup('transform:json');
    assert.ok(transform);
  });
});
