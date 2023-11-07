import { module, skip } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-seven', function (hooks) {
  setupRenderingTest(hooks);

  skip('renders heading on verification page when profile Status is pending', async function (assert) {
    this.set('model', { profileStatus: 'PENDING' });
    await render(hbs`<IdentitySteps::StepSeven @model={{@model}} />`);

    assert.dom('[data-test=heading]').hasClass('verification-page__heading');
    assert
      .dom('[data-test=heading]')
      .hasText('Verification process is Pending!');
  });

  skip('render description on verification page when profile Status is pending', async function (assert) {
    this.set('model', { profileStatus: 'PENDING' });
    await render(hbs`<IdentitySteps::StepSeven @model={{@model}} />`);

    assert
      .dom('[data-test=description]')
      .hasClass('verification-page__description');
    assert
      .dom('[data-test=description]')
      .hasText(
        'Reload to verify and complete the linking between your Profile service and Real Dev Squad service'
      );
  });
});
