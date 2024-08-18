import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ANKUSH_TWITTER } from '../../constants/urls';

module('Integration | Component | status-card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('joinDiscordHandler', () => {
      window.open = this.spy();
    });
    this.set('ANKUSH_TWITTER', ANKUSH_TWITTER);
  });

  test('it renders pending status', async function (assert) {
    this.set('status', 'pending');
    this.set('feedback', 'Feedback for pending status');

    await render(hbs`
      <JoinSteps::StatusCard
        @status={{this.status}}
        @feedback={{this.feedback}}
        @joinDiscord={{this.joinDiscordHandler}}
      />
    `);

    await waitFor('[data-test-status-card-heading]', { timeout: 5000 });

    assert.dom('[data-test-status-card-heading]').hasText('Pending');
    assert.dom('[data-test-icon="pending"]').exists();
  });

  test('it renders rejected status', async function (assert) {
    assert.expect(5);

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
      .hasText(
        `We're sorry to inform you that your application has been rejected.`,
      );

    assert.dom('[data-test-status-card-feedback-title]').hasText('Feedback:');
    assert
      .dom('[data-test-status-card-feedback-content]')
      .hasText('Feedback for rejected status');
  });

  test('it renders accepted status with feedback', async function (assert) {
    assert.expect(5);

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
      .hasText('Congratulations! Your application has been accepted.');
    assert.dom('[data-test-status-card-description-2]').hasText('Feedback:');
    assert
      .dom('[data-test-status-card-description-3]')
      .hasText('Feedback for accepted status');
  });

  test('it renders accepted status without feedback', async function (assert) {
    assert.expect(4);

    this.set('status', 'accepted');
    this.set('feedback', null);

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
      .hasText('Congratulations! Your application has been accepted.');
    assert.dom('[data-test-status-card-description-2]').doesNotExist();
  });

  test('it handles unknown status', async function (assert) {
    assert.expect(2);

    this.set('status', 'unknown');
    this.set('feedback', 'This is unexpected');

    await render(hbs`
      <JoinSteps::StatusCard
        @status={{this.status}}
        @feedback={{this.feedback}}
        @joinDiscord={{this.joinDiscordHandler}}
      />
    `);

    assert.dom('[data-test-status-card-heading]').doesNotExist();
    assert.dom('[data-test-icon]').doesNotExist();
  });
});
