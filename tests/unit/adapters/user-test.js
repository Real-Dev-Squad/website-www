import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Adapter | user', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:user');
    assert.ok(adapter);
  });

  test('urlForQuery appends "/search" to the URL when query has a role', function (assert) {
    let adapter = this.owner.lookup('adapter:user');
    let query = { role: 'members' };

    let result = adapter.urlForQuery(query);

    assert.deepEqual(
      result,
      'https://staging-api.realdevsquad.com/search',
      'it appends "/search" to the URL'
    );
  });

  test('urlForQuery does not append "/search" to the URL when query does not have a role', function (assert) {
    let adapter = this.owner.lookup('adapter:user');
    let query = { otherParam: 'value' };

    let result = adapter.urlForQuery(query);

    assert.deepEqual(
      result,
      'https://staging-api.realdevsquad.com',
      'it does not append "/search" to the URL'
    );
  });
});
