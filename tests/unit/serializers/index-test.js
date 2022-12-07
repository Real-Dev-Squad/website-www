import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Serializer | index', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('index');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('index', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
