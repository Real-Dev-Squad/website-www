import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stepper-signup', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('stepper-signup page render', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    assert.expect(1);
    await render(hbs`<StepperSignup />`);

    assert.dom('h1').hasText('Hello world');
  });
});
