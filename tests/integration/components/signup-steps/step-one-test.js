import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SignupSteps::StepOne />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <SignupSteps::StepOne>
        template block text
      </SignupSteps::StepOne>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
