import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stepper-signup', function (hooks) {
  setupRenderingTest(hooks);

  test('stepper-signup page render', async function (assert) {
    assert.expect(1);

    await render(hbs`<StepperSignup />`);
    assert.dom('[data-test-onboarding-card-modal]').exists();
  });
});
