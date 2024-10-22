import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | subscribe', function (hooks) {
  setupRenderingTest(hooks);

  test('subscribe form renders and functions correctly', async function (assert) {
    assert.expect(8);

    this.set('email', 'test@example.com');
    this.set('phone', '1234567890');
    this.set('isSubscribed', false);

    this.set('updateEmail', (event) => {
      this.set('email', event.target.value);
    });

    this.set('updatePhone', (event) => {
      this.set('phone', event.target.value);
    });

    this.set('onSubmit', (event) => {
      event.preventDefault();
      this.set('isSubscribed', true);
    });

    await render(hbs`
      <form {{on "submit" this.onSubmit}} data-test-subscribe-form>
        <label for="email" data-test-email-label>Email:</label>
        <input 
          type="email" 
          id="email" 
          value={{this.email}}
          data-test-email-input
          {{on "input" this.updateEmail}}
        />
    
        <label for="phone" data-test-phone-label>Phone:</label>
        <input 
          type="tel" 
          id="phone" 
          value={{this.phone}}
          data-test-phone-input
          {{on "input" this.updatePhone}}
        />
    
        <button type="submit" data-test-submit-button>Subscribe</button>
      </form>
    `);

    assert
      .dom('[data-test-email-label]')
      .hasText('Email:', 'Email label is rendered');

    assert
      .dom('[data-test-phone-label]')
      .hasText('Phone:', 'Phone label is rendered');

    assert
      .dom('[data-test-submit-button]')
      .hasText('Subscribe', 'Submit button is rendered');

    assert
      .dom('[data-test-email-input]')
      .hasValue('test@example.com', 'Email initial value is correct');

    assert
      .dom('[data-test-phone-input]')
      .hasValue('1234567890', 'Phone initial value is correct');

    await fillIn('[data-test-email-input]', 'new@example.com');
    await fillIn('[data-test-phone-input]', '0987654321');

    assert
      .dom('[data-test-email-input]')
      .hasValue('new@example.com', 'Email value updates correctly');

    assert
      .dom('[data-test-phone-input]')
      .hasValue('0987654321', 'Phone value updates correctly');

    await click('[data-test-submit-button]');

    assert.ok(
      this.isSubscribed,
      'User should be subscribed after form submission',
    );
  });

  test('subscribe form prevents submission with invalid email', async function (assert) {
    this.set('email', '');
    this.set('phone', '1234567890');
    this.set('isSubscribed', false);

    await render(hbs`
      <form {{on "submit" this.onSubmit}} data-test-subscribe-form>
      <label for="email" data-test-email-label>Email:</label>
        <input type="email" value={{this.email}} data-test-email-input />
        <input type="tel" value={{this.phone}} data-test-phone-input />
        <label for="phone" data-test-email-label>Phone:</label>
        <button type="submit" data-test-submit-button>Subscribe</button>
      </form>
    `);

    assert
      .dom('[data-test-submit-button]')
      .isDisabled('Submit button is disabled with an empty email');

    await fillIn('[data-test-email-input]', 'invalidemail');
    assert
      .dom('[data-test-submit-button]')
      .isDisabled('Submit button is disabled with an invalid email');
  });
});
