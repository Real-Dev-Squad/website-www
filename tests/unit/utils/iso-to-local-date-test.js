import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { isoToLocalDate } from 'website-www/utils/common-utils';

module('Unit | Utility | isoToLocalDate', function (hooks) {
  setupTest(hooks);
  test('Properly convert iso date to local date', function (assert) {
    assert.strictEqual(
      isoToLocalDate('2023-08-24T12:45:12.013000+00:00'),
      '24/7/2023 18:15:12:13',
    );
  });
});
