import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { getUTCMidnightTimestampFromDate } from 'website-www/utils/date-conversion';

module('Unit | Utils | dateConversion', function (hooks) {
  setupTest(hooks);

  test('it returns the correct UTC midnight timestamp for a date string', function (assert) {
    const result = getUTCMidnightTimestampFromDate('2025-01-10');
    assert.strictEqual(
      result,
      1736467200000,
      'Correct timestamp for 2025-01-10',
    );
  });

  test('it works correctly for the Unix Epoch start date', function (assert) {
    const result = getUTCMidnightTimestampFromDate('1970-01-01');
    assert.strictEqual(
      result,
      0,
      'Correct timestamp for Unix Epoch start date 1970-01-01',
    );
  });

  test('it handles leap years correctly', function (assert) {
    const result = getUTCMidnightTimestampFromDate('2024-02-29');
    assert.strictEqual(
      result,
      1709164800000,
      'Correct timestamp for leap day 2024-02-29',
    );
  });

  test('it handles the start and end of a year correctly', function (assert) {
    const startOfYear = getUTCMidnightTimestampFromDate('2024-01-01');
    const endOfYear = getUTCMidnightTimestampFromDate('2024-12-31');

    assert.strictEqual(
      startOfYear,
      1704067200000,
      'Correct timestamp for start of the year 2024-01-01',
    );
    assert.strictEqual(
      endOfYear,
      1735603200000,
      'Correct timestamp for end of the year 2024-12-31',
    );
  });
});
