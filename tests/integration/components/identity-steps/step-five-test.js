import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-five', function (hooks) {
  setupRenderingTest(hooks);

  test('render main container div on profile service page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );

    assert.dom('[data-test=profile-service]').exists();
    assert.dom('[data-test=profile-service]').hasClass('profile-service-page');
  });

  test('render heading on profile service page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );
    assert.dom('[data-test=heading]').hasClass('profile-service-page__heading');
    assert.dom('[data-test=heading]').hasText('Deploy Profile Service');
  });

  test('render description on profile service page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test=description]')
      .hasClass('profile-service-page__description');
    assert
      .dom('[data-test=description]')
      .hasText(
        'Set the chaincode on your profile service. Deploy it and enter your profile service URL'
      );
  });

  test('render input field on profile service page', async function (assert) {
    assert.expect(5);
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-input-field=profile-service]')
      .hasClass('profile-service-page__inputContainer__input-url');
    assert
      .dom('[data-test-input-field=profile-service]')
      .hasAttribute('id', 'profile-service-url');
    assert
      .dom('[data-test-input-field=profile-service]')
      .hasProperty('type', 'text');
    assert
      .dom('[data-test-input-field=profile-service]')
      .hasProperty('value', '');
    assert
      .dom('[data-test-input-field=profile-service]')
      .hasProperty('placeholder', 'Enter your profile service URL');
  });

  test('Display Tooltip Information on Mouse Hover', async function (assert) {
    assert.expect(1);

    await render(hbs`<IdentitySteps::StepFive />`);

    await triggerEvent('[data-test=tooltip]', 'mouseover');

    assert.dom('[data-test=tooltip-info]').hasClass('active-tooltip-info');
  });

  test('Not Display Tooltip Information on Mouse Out', async function (assert) {
    assert.expect(1);

    await render(hbs`<IdentitySteps::StepFive />`);

    await triggerEvent('[data-test=tooltip]', 'mouseout');

    assert.dom('[data-test=tooltip-info]').hasClass('tooltip-info');
  });
});
