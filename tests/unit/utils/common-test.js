import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { readMoreFormatter } from 'website-www/utils/common-utils';

module('Unit | Util | readMoreFormatter', function (hooks) {
  setupTest(hooks);

  test('should return empty string if empty string is passed', function (assert) {
    const result = readMoreFormatter('', 10);

    assert.strictEqual(result, '');
  });

  test('should return the string if length of string is less than the length passed to format the string', function (assert) {
    const demoString = 'Lorem Ipsum is simply dummy text';

    const result = readMoreFormatter(demoString, 32);
    assert.strictEqual(result, demoString);
  });

  test('should format the string upto the given length in read more format', function (assert) {
    const demoString =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

    const result = readMoreFormatter(demoString, 32);
    assert.strictEqual(result, 'Lorem Ipsum is simply dummy text...');
  });
});
