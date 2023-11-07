import { module, skip } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-seven', function (hooks) {
  setupRenderingTest(hooks);

  skip('renders heading on verification page', async function (assert) {
    this.set('model', { profileStatus: 'BLOCKED' });
    await render(hbs`<IdentitySteps::StepSeven @model={{@model}} />`);

    assert.dom(this.element).hasText('');

    await render(hbs`
      <IdentitySteps::StepSeven>
        template block text
      </IdentitySteps::StepSeven>
    `);

    assert.dom('[data-test=heading]').hasClass('verification-page__heading');
    assert
      .dom('[data-test=heading]')
      .hasText('Verification process is Pending!');
  });
});
