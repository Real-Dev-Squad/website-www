import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Controller | subscribe', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.controller = this.owner.lookup('controller:subscribe');
    this.controller.login = {
      userData: { isSubscribed: false },
      isLoggedIn: true,
    };
    this.controller.toast = {
      error: () => {},
      info: () => {},
    };
  });

  test('it toggles the form modal', function (assert) {
    assert.notOk(this.controller.isFormOpen, 'Form modal is initially closed');
    this.controller.toggleFormModal();
    assert.ok(this.controller.isFormOpen, 'Form modal is now open');
    this.controller.toggleFormModal();
    assert.notOk(this.controller.isFormOpen, 'Form modal is now closed');
  });

  test('it toggles the subscription modal', function (assert) {
    assert.notOk(
      this.controller.showSubscriptionModal,
      'Subscription modal is initially closed',
    );
    this.controller.toggleSubscriptionModal();
    assert.ok(
      this.controller.showSubscriptionModal,
      'Subscription modal is now open',
    );
    this.controller.toggleSubscriptionModal();
    assert.notOk(
      this.controller.showSubscriptionModal,
      'Subscription modal is now closed',
    );
  });

  test('it updates email correctly', function (assert) {
    this.controller.updateEmail({ target: { value: 'test@example.com' } });
    assert.strictEqual(
      this.controller.email,
      'test@example.com',
      'Email is updated correctly',
    );
  });

  test('it updates phone correctly', function (assert) {
    this.controller.updatePhone({ target: { value: '+919876543210' } });
    assert.strictEqual(
      this.controller.phone,
      '+919876543210',
      'Phone is updated correctly',
    );
  });

  test('it disables submit when email is empty', function (assert) {
    this.controller.email = '';
    this.controller.phone = '9876543210';
    assert.ok(
      this.controller.isSubmitDisabled,
      'Submit is disabled when email is empty',
    );
  });

  test('it disables submit when phone is invalid', function (assert) {
    this.controller.email = 'test@example.com';
    this.controller.phone = '12345';
    assert.ok(
      this.controller.isSubmitDisabled,
      'Submit is disabled when phone is invalid',
    );
  });

  test('it enables submit when email and phone are valid', function (assert) {
    this.controller.email = 'test@example.com';
    this.controller.phone = '+919876543210';
    assert.notOk(
      this.controller.isSubmitDisabled,
      'Submit is enabled when email and phone are valid',
    );
  });

  test('it handles form submission correctly', async function (assert) {
    assert.expect(4);
    this.controller.isLoading = false;
    this.controller.email = 'test@example.com';
    this.controller.phone = '+919876543210';

    window.fetch = async () => ({
      ok: true,
    });

    await this.controller.handleSubmit({ preventDefault: () => {} });

    assert.ok(
      this.controller.login.userData.isSubscribed,
      'User is subscribed after successful submission',
    );
    assert.notOk(
      this.controller.isLoading,
      'Loading state is false after submission',
    );
    assert.strictEqual(
      this.controller.email,
      '',
      'Email is reset after submission',
    );
    assert.strictEqual(
      this.controller.phone,
      '',
      'Phone is reset after submission',
    );
  });
});
