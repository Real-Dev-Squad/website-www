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
      <OnboardingCard >
        <h3 data-test-archived-heading>Archived User</h3>
        <p data-test-archived-message>
          This user account has been archived. If you have any questions or need assistance,
          please contact Ankush via Twitter.
        </p>
        <div data-test-archived-contact-container>
          <a href="https://twitter.com/ankushdharkar" data-test-archived-contact-link target="_blank" rel="noopener noreferrer">
            Contact Ankush on Twitter
          </a>
        </div>
      </OnboardingCard>
    `);

    assert.dom('[data-test-archived-heading]').hasText('Archived User');
    assert
      .dom('[data-test-archived-message]')
      .hasText(
        'This user account has been archived. If you have any questions or need assistance, please contact Ankush via Twitter.',
      );
    assert
      .dom('[data-test-archived-contact-link]')
      .hasText('Contact Ankush on Twitter');
  });
});
