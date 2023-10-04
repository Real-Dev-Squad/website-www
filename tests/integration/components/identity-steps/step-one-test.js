import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('stepOne renders', async function (assert) {
    assert.expect(5);
    let clicked = false;
    this.set('startHandler', () => {
      clicked = true;
    });

    await render(
      hbs`<IdentitySteps::StepOne @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-getting-started-heading]')
      .hasText('Challenge Time !!');
    assert
      .dom('[data-test-getting-started-paragraph-1]')
      .hasText(
        'Thank you for providing all the details Before joining the community we would want you to complete a small challenge which will also help you in setting up your identity across Real Dev Squad'
      );
    assert
      .dom('[data-test-getting-started-paragraph-2]')
      .hasText('Please click proceed to know about the task');
    assert.dom('[data-test-button=identity-proceed]').hasText('Proceed');
    await click('[data-test-button=identity-proceed]');
    assert.true(clicked, 'startHandler is called');
  });
});
