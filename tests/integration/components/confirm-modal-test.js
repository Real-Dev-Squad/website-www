import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { QR_SCAN_CONFIRMATION_MESSAGE } from 'website-www/constants/auth-status';

module('Integration | Component | confirm-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the modal with correct message and buttons', async function (assert) {
    this.setProperties({
      isOpen: true,
      message: QR_SCAN_CONFIRMATION_MESSAGE,
      actionButtonDisabled: false,
      onConfirm: () => {},
      onCancel: () => {},
    });

    await render(hbs`
      <ConfirmModal
        @isOpen={{this.isOpen}}
        @message={{this.message}}
        @actionButtonDisabled={{this.actionButtonDisabled}}
        @onConfirm={{this.onConfirm}}
        @onCancel={{this.onCancel}}
      />
    `);

    assert.dom('[data-test-confirm-modal]').exists();
    assert
      .dom('[data-test-confirm-modal-message]')
      .hasText(QR_SCAN_CONFIRMATION_MESSAGE, 'Correct message is shown');
    assert.dom('[data-test-button=confirm-modal-cancel]').exists();
    assert.dom('[data-test-button=confirm-modal-submit]').exists();
  });

  test('action buttons are disabled when @actionButtonDisabled=true', async function (assert) {
    this.setProperties({
      isOpen: true,
      message: QR_SCAN_CONFIRMATION_MESSAGE,
      actionButtonDisabled: true,
      onConfirm: () => {},
      onCancel: () => {},
    });

    await render(hbs`
      <ConfirmModal
        @isOpen={{this.isOpen}}
        @message={{this.message}}
        @actionButtonDisabled={{this.actionButtonDisabled}}
        @onConfirm={{this.onConfirm}}
        @onCancel={{this.onCancel}}
      />
    `);

    assert
      .dom('[data-test-button=confirm-modal-submit]')
      .isDisabled('Confirm button is disabled');
    assert
      .dom('[data-test-button=confirm-modal-cancel]')
      .isDisabled('Cancel button is disabled');
  });

  test('calls @onCancel and @onConfirm actions when respective buttons are clicked', async function (assert) {
    this.setProperties({
      isOpen: true,
      message: QR_SCAN_CONFIRMATION_MESSAGE,
      actionButtonDisabled: false,
      onConfirm: () => assert.step('confirm-called'),
      onCancel: () => assert.step('cancel-called'),
    });

    await render(hbs`
      <ConfirmModal
        @isOpen={{this.isOpen}}
        @message={{this.message}}
        @actionButtonDisabled={{this.actionButtonDisabled}}
        @onConfirm={{this.onConfirm}}
        @onCancel={{this.onCancel}}
      />
    `);

    await click('[data-test-button=confirm-modal-submit]');
    assert.verifySteps(['confirm-called'], 'Confirm action was called');

    await click('[data-test-button=confirm-modal-cancel]');
    assert.verifySteps(['cancel-called'], 'Cancel action was called');
  });
});
