import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Model | members', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('members', {});
    assert.ok(model);
  });
});
