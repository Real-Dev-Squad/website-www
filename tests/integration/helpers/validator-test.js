import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
// import { render } from '@ember/test-helpers';
// import { hbs } from 'ember-cli-htmlbars';
import { validator } from '../../../app/helpers/validator.js';

module('Integration | Util validator', function (hooks) {
  setupRenderingTest(hooks);
  //setupTest(hooks)

  assert.expect(2);

  test.skip('it tests validator', async function (assert) {
    this.set('value', 'lorem ipsum doler sit consectetur');
    this.set('isValid', false);
    console.log(validator);
    validator(this.value, 1);
    assert.strictEqual(this.isValid, true, 'value is valid!');
  });
});
