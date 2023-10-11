import { module, skip } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-five', function (hooks) {
  setupRenderingTest(hooks);

  skip('render main container div on profile service page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );

    assert.dom('[data-test=profile-service]').exists();
    assert.dom('[data-test=profile-service]').hasClass('profile-service-page');
  });

  skip('render heading on profile service page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );
    assert.dom('[data-test=heading]').hasClass('profile-service-page__heading');
    assert.dom('[data-test=heading]').hasText('Deploy Profile Service');
  });

  skip('render description on profile service page', async function (assert) {
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

  skip('render input field on profile service page', async function (assert) {
    assert.expect(6);
    await render(
      hbs`<IdentitySteps::StepFive  @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-input-field=profile-service')
      .hasAttribute('name', 'profile-service');
    assert
      .dom('[data-test-input-field=profile-service')
      .hasClass('input__field');
    assert
      .dom('[data-test-input-field=profile-service')
      .hasAttribute('id', 'profile-service');
    assert
      .dom('[data-test-input-field=profile-service')
      .hasProperty('type', 'text');
    assert
      .dom('[data-test-input-field=profile-service')
      .hasProperty('value', '');
    assert
      .dom('[data-test-input-field=profile-service')
      .hasProperty('placeholder', 'Enter your profile service URL');
  });
});
