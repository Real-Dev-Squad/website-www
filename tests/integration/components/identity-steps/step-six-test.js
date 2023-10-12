import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-six', function (hooks) {
  setupRenderingTest(hooks);

  test('render main container div on profile service url Linking page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepSix  @startHandler={{this.startHandler}} />`
    );

    assert.dom('[data-test=profile-service-url-Linking]').exists();
    assert
      .dom('[data-test=profile-service-url-Linking]')
      .hasClass('profile-service-url-linking-page');
  });

  test('render heading on profile service url Linking page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepSix  @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test=heading]')
      .hasClass('profile-service-url-linking-page__heading');
    assert.dom('[data-test=heading]').hasText('Link Profile Service');
  });

  test('render description on profile service url Linking page', async function (assert) {
    assert.expect(2);
    this.set('startHandler', () => {});
    await render(
      hbs`<IdentitySteps::StepSix  @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test=description]')
      .hasClass('profile-service-url-linking-page__description');
    assert
      .dom('[data-test=description]')
      .hasText(
        'Ensure that you have deployed your profile service, Click on link button to start the linking process for joining RealDevSquad.'
      );
  });

  test('Render Link button on profile service url Linking page', async function (assert) {
    assert.expect(3);

    this.set('startHandler', () => {});

    await render(
      hbs`<IdentitySteps::StepSix @startHandler={{this.startHandler}} />`
    );

    assert.dom('[data-test-button=next]').exists();
    assert.dom('[data-test-button=next]').hasText('Link');
    assert.dom('[data-test-button=next]').hasProperty('type', 'button');
  });
});
