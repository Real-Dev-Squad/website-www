import checkURL from 'website-www/utils/check-url';
import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Utility | checkURL', function (hooks) {
  setupTest(hooks);
  test('checkURL utility exists', function (assert) {
    assert.ok(checkURL, 'checkURL utility should be defined');
  });

  test('return true for valid url string', function (assert) {
    const result = checkURL('https://rds.onrender.com');
    assert.true(result, 'There should be true for valid url');
  });

  test('return false for invalid url string', function (assert) {
    const result = checkURL('rds.onrender.com');
    assert.false(result, 'There should be true for valid url');
  });
});
