import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { NEW_SIGNUP_STEPS } from 'website-www/constants/new-signup';

module('Integration | Component | new-signup/input', function (hooks) {
  setupRenderingTest(hooks);

  test('it has a first name when current step is firstStep', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[2];
      },
      currentStep: 'firstName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert
      .dom('[data-test-signup-form-label]')
      .hasText('What is your first name?');
  });

  test('it has a lastname label when current step is lastName', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[3];
      },
      currentStep: 'lastName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert
      .dom('[data-test-signup-form-label]')
      .hasText('And what is your last name?');
  });

  test('it has a username label when current step is username', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[4];
      },
      currentStep: 'username',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert
      .dom('[data-test-signup-form-label]')
      .hasText('Now choose your awesome username!');
  });

  test('it should have button with text', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[2];
      },
      currentStep: 'firstName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-button="signup"]').exists();
    assert.dom('[data-test-button="signup"]').hasAnyText();
  });

  test('button should have text Submit if the current step is lastName', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[5];
      },
      currentStep: 'lastName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-button="signup"]').exists();
    assert.dom('[data-test-button="signup"]').hasText('Submit');
  });

  test('button should have text Next if the current step is username and if dev is set to true', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[4];
      },
      currentStep: 'username',
      dev: true,
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
      />`);

    assert.dom('[data-test-button="signup"]').exists();
    assert.dom('[data-test-button="signup"]').hasText('Next');
  });

  test('it should have input field', async function (assert) {
    assert.expect(3);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[2];
      },
      currentStep: 'firstName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-signup-form-input]').exists();
    assert
      .dom('[data-test-signup-form-input]')
      .hasProperty('type', 'text')
      .hasAttribute('placeholder');
  });

  test('disables button when input is not provided', async function (assert) {
    this.setProperties({
      currentStep: NEW_SIGNUP_STEPS[1],
      isButtonDisabled: true,
      isLoading: false,
      onChange: () => {},
      onClick: () => {},
    });

    await render(hbs`
      <NewSignup::Input 
        @currentStep={{this.currentStep}} 
        @isButtonDisabled={{this.isButtonDisabled}} 
        @isLoading={{this.isLoading}} 
        @onChange={{this.onChange}} 
        @onClick={{this.onClick}} 
        @error={{this.error}} 
      />
    `);

    assert.dom('[data-test-button="signup"]').isDisabled();
  });
});
