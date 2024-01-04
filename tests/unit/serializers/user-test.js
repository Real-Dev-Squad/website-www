import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Serializer | user', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('user');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('user', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
