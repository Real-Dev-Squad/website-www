import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('stepOne page of identity service renders', async function (assert) {
    assert.expect(3);
    let clicked = false;
    this.set('startHandler', () => {
      clicked = true;
    });

    await render(
      hbs`<IdentitySteps::StepOne @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-getting-started-paragraph-2]')
      .hasText('Please click proceed to know about the task');
    assert.dom('[data-test-button=identity-proceed]').hasText('Proceed');
    await click('[data-test-button=identity-proceed]');
    assert.true(clicked, 'startHandler is called');
  });
});
