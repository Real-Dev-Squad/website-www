import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { validator } from 'website-www/utils/validator';

module('Unit | Utils | validator', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    assert.ok(validator, 'Validator utility should be defined');
  });

  test('returns isValid as false for an empty string', function (assert) {
    const result = validator('', 1);
    assert.notOk(result.isValid, 'isValid should be false for an empty string');
    assert.strictEqual(
      result.remainingWords,
      1,
      'There should be 1 remaining word for an empty string'
    );
  });

  test('returns isValid as false for insufficient words', function (assert) {
    const result = validator('hello', 2);
    assert.notOk(
      result.isValid,
      'isValid should be false for insufficient words'
    );
    assert.strictEqual(
      result.remainingWords,
      1,
      'There should be 1 remaining word for insufficient words'
    );
  });

  test('returns isValid as true for exact words', function (assert) {
    const result = validator('hello world', 2);
    assert.ok(result.isValid, 'isValid should be true for exact words');
    assert.strictEqual(
      result.remainingWords,
      0,
      'There should be 0 remaining words for exact words'
    );
  });
});
