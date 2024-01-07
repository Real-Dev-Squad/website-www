import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | status-card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('joinDiscordHandler', () => {
      window.open = this.spy();
    });
  });

  test('it renders pending status', async function (assert) {
    assert.expect(4);

    this.set('status', 'pending');
    this.set('feedback', 'Feedback for pending status');

    await render(hbs`
      <JoinSteps::StatusCard
        @status={{this.status}}
        @feedback={{this.feedback}}
        @joinDiscord={{this.joinDiscordHandler}}
      />
    `);

    assert.dom('[data-test-status-card-heading]').hasText('Pending');
    assert.dom('[data-test-icon="pending"]').exists();
    assert
      .dom('[data-test-status-card-description-1]')
      .hasText(
        'Your application is currently in pending state, please regularly check this page for invite link.',
      );
    assert.dom('[data-test-status-card-buttons] button').isDisabled();
  });

  test('it renders rejected status', async function (assert) {
    assert.expect(4);
    this.set('status', 'rejected');
    this.set('feedback', 'Feedback for rejected status');
    await render(hbs`
      <JoinSteps::StatusCard
        @status={{this.status}}
        @feedback={{this.feedback}}
        @joinDiscord={{this.joinDiscordHandler}}
      />
    `);

    assert.dom('[data-test-status-card-heading]').hasText('Rejected');
    assert.dom('[data-test-icon="rejected"]').exists();
    assert
      .dom('[data-test-status-card-description-1]')
      .hasText('Your application is rejected');
    assert
      .dom('[data-test-status-card-description-2]')
      .hasText("Here's the feedback for your application");
  });

  test('it renders accepted status', async function (assert) {
    assert.expect(6);

    this.set('status', 'accepted');
    this.set('feedback', 'Feedback for accepted status');

    await render(hbs`
      <JoinSteps::StatusCard
        @status={{this.status}}
        @feedback={{this.feedback}}
        @joinDiscord={{this.joinDiscordHandler}}
      />
    `);

    assert.dom('[data-test-status-card-heading]').hasText('Accepted');
    assert.dom('[data-test-icon="accepted"]').exists();
    assert
      .dom('[data-test-status-card-description-1]')
      .hasText('Congratulations! Your application is accepted by us');
    assert
      .dom('[data-test-status-card-description-2]')
      .hasText("Here's the feedback for your application");
    assert
      .dom('[data-test-status-card-description-3]')
      .hasText('Feedback for accepted status');
    assert.dom('[data-test-status-card-buttons] button').isNotDisabled();
  });
});
