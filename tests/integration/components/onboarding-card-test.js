import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<OnboardingCard />`);
    assert.dom('[data-test-onboarding-card-modal]').exists();
    assert.dom('[data-test-onboarding-card-modal]').hasText('');
    assert.dom(this.element).hasText('');
    await render(hbs`
      <OnboardingCard>
        Archived User
      </OnboardingCard>
    `);
    assert.dom('[data-test-onboarding-card-modal]').hasText('Archived User');
  });
});
