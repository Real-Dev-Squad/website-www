import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | qr-auth', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.mockConfirmQRAuth = sinon.stub();
  });

  test('it renders QR code when @qrCodeText is provided', async function (assert) {
    await render(
      hbs`<QrAuth @qrCodeText="test-qr-code" @verifyQRAuthStatus={{this.mockConfirmQRAuth}} />`,
    );

    assert.dom('[data-test="qr-code"]').exists('QR Code should be displayed');
  });

  test('it does not render QR code when @qrCodeText is missing', async function (assert) {
    await render(
      hbs`<QrAuth @verifyQRAuthStatus={{this.mockConfirmQRAuth}} />`,
    );

    assert
      .dom('[data-test="qr-code"]')
      .doesNotExist('QR Code should not be displayed');
  });

  test('it renders the verify status button', async function (assert) {
    await render(
      hbs`<QrAuth @qrCodeText="test-qr-code" @verifyQRAuthStatus={{this.mockConfirmQRAuth}} />`,
    );

    assert
      .dom('[data-test-verify-button]')
      .exists('Verify Status button should be displayed');
  });

  test('clicking verify status button triggers @verifyQRAuthStatus action', async function (assert) {
    await render(
      hbs`<QrAuth @qrCodeText="test-qr-code" @verifyQRAuthStatus={{this.mockConfirmQRAuth}} />`,
    );
    await click('[data-test-verify-button]');

    assert.ok(this.mockConfirmQRAuth.calledOnce, 'Verify action is called');
  });
});
