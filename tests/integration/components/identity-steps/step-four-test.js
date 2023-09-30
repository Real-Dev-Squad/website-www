import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-four', function (hooks) {
  setupRenderingTest(hooks);

  test('render main container div on generate chaincode page', async function (assert) {
    assert.expect(2);
    await render(hbs`<IdentitySteps::StepFour />`);

    assert.dom('[data-test=chaincode]').exists();
    assert.dom('[data-test=chaincode]').hasClass('chaincode-page');
  });

  test('render heading on generate chaincode page', async function (assert) {
    assert.expect(2);
    await render(hbs`<IdentitySteps::StepFour />`);
    assert.dom('[data-test=heading]').hasClass('chaincode-page__heading');
    assert.dom('[data-test=heading]').hasText('Chaincode Generation');
  });

  test('render description on generate chaincode page', async function (assert) {
    assert.expect(2);
    await render(hbs`<IdentitySteps::StepFour />`);
    assert
      .dom('[data-test=description]')
      .hasClass('chaincode-page__description');
    assert
      .dom('[data-test=description]')
      .hasText(
        "A private key that you need to use in your profile service URL and deploy for source that you're the source of the URL"
      );
  });
});
