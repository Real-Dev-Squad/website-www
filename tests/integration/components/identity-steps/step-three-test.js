import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-three', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('startHandler', async () => {
      await click('[data-test-button=lets-go]');
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
    assert.dom('[data-test-button]').hasText('Next');
  });
});
