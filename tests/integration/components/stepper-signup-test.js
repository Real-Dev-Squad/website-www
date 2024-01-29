import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stepper-signup', function (hooks) {
  setupRenderingTest(hooks);

  test('stepper-signup page renders without error message', async function (assert) {
    assert.expect(1);

    await render(hbs`<StepperSignup />`);

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('stepper-signup page renders with error message', async function (assert) {
    assert.expect(1);
    await render(hbs`
      <StepperSignup />
      <p class="error-message" data-test-error-message>Please fill in all the required fields</p>
    `);

    assert.dom('[data-test-error-message]').exists();
  });
});
