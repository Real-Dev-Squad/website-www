import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-four', function (hooks) {
  setupRenderingTest(hooks);

  test('render main container div on generate chaincode page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {});
    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
        />`,
    );

    assert.dom('[data-test=chaincode]').exists();
    assert.dom('[data-test=chaincode]').hasClass('chaincode-page');
  });

  test('render heading on generate chaincode page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {});
    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
        />`,
    );
    assert.dom('[data-test=heading]').hasClass('chaincode-page__heading');
    assert.dom('[data-test=heading]').hasText('Chaincode Generation');
  });

  test('render description on generate chaincode page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {});
    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
        />`,
    );
    assert
      .dom('[data-test=description]')
      .hasClass('chaincode-page__description');
    assert
      .dom('[data-test=description]')
      .hasText(
        "A private key that you need to use in your profile service URL and deploy for source that you're the source of the URL",
      );
  });

  test('render Generation Chaincode button on chaincode page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {});
    this.set('chaincode', 'Generate Chaincode');
    this.set('isChaincodeClicked', false);
    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
            @isChaincodeClicked={{this.isChaincodeClicked}}
            @chaincode={{this.chaincode}}
        />`,
    );
    assert.dom('[data-test-button=chaincode]').hasText('Generate Chaincode');
    assert.dom('[data-test-button=chaincode]').hasProperty('type', 'button');
  });

  test('render disabled Next button on chaincode page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {});
    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
        />`,
    );
    assert.dom('[data-test-button=next]').hasText('Next');
    assert.dom('[data-test-button=next]').hasProperty('disabled', true);
  });

  test('Clicking "Generate Chaincode" button renders div with text and 2 button with icons on Chaincode page', async function (assert) {
    assert.expect(6);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {
      this.set('isChaincodeClicked', true);
    });

    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
            @isChaincodeClicked={{this.isChaincodeClicked}}
        />`,
    );
    await click('[data-test-button=chaincode]');

    assert.dom('[data-test=chaincode-container]').exists();
    assert
      .dom('[data-test=chaincode-container__value]')
      .hasClass('chaincode-container__value-invisible');
    assert
      .dom('[data-test=chaincode-container__value]')
      .hasText('********************');

    assert
      .dom('[data-test=chaincode-container-action]')
      .hasClass('chaincode-container-action');

    assert.dom('[data-test-button=eye-icon]').hasClass('chaicode-button-icon');
    assert.dom('[data-test-button=copy-icon]').hasClass('chaicode-button-icon');
  });

  test('Clicking eye-icon button show generated code', async function (assert) {
    assert.expect(1);
    this.set('startHandler', () => {});
    this.set('handleGenerateChaincode', () => {});
    this.set('isChaincodeClicked', true);
    this.set('chaincode', 'hv2hz3xh1h');
    await render(
      hbs`<IdentitySteps::StepThree  
            @startHandler={{this.startHandler}} 
            @handleGenerateChaincode={{this.handleGenerateChaincode}} 
            @isChaincodeClicked={{this.isChaincodeClicked}}
            @chaincode={{this.chaincode}}
        />`,
    );
    await click('[data-test-button=eye-icon]');

    assert.dom('[data-test=chaincode-container__value]').hasText('hv2hz3xh1h');
  });
});
