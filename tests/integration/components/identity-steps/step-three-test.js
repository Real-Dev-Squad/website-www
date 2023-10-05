import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-three', function (hooks) {
  setupRenderingTest(hooks);

  test('stepThree renders', async function (assert) {
    assert.expect(5);
    let clicked = false;
    this.set('startHandler', () => {
      clicked = true;
    });

    await render(
      hbs`<IdentitySteps::StepThree @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-getting-started-heading]')
      .hasText('Chaincode Generation');
    assert
      .dom('[data-test-getting-started-paragraph-1]')
      .hasText(
        "A private that you need to use in your profile service URL and deploy for source that you're the source of the URL"
      );
    assert
      .dom('[data-test-getting-started-paragraph-2]')
      .hasText('https://github.com/identity-service/instructions.md');
    assert.dom('[data-test-button=identity-next]').hasText('Next');
    await click('[data-test-button=identity-next]');
    assert.true(clicked, 'click is called');
  });
});
