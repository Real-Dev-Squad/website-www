import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { NEW_SIGNUP_STEPS } from 'website-www/constants/new-signup';
import { superUserData } from 'website-www/tests/constants/users-data';

module('Integration | Component | new-signup/input', function (hooks) {
  setupRenderingTest(hooks);

  test('renders label and updates value on input change', async function (assert) {
    assert.expect(2);

    this.setProperties({
      currentStep: NEW_SIGNUP_STEPS[1],
      isButtonDisabled: false,
      isLoading: false,
      onChange: (step, value) => {
        assert.strictEqual(step, NEW_SIGNUP_STEPS[1]);
        assert.strictEqual(value, superUserData.first_name);
      },
      onClick: () => {},
    });

    await render(hbs`
      <NewSignup::Input 
        @currentStep={{this.currentStep}} 
        @isButtonDisabled={{this.isButtonDisabled}} 
        @isLoading={{this.isLoading}} 
        @onChange={{this.onChange}} 
        @onClick={{this.onClick}} 
      />
    `);

    await fillIn('[data-test-signup-form-input]', superUserData.first_name);
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

    assert.dom('[data-test-signup]').isDisabled();
  });

  test('shows "Submit" on lastName step', async function (assert) {
    this.setProperties({
      currentStep: NEW_SIGNUP_STEPS[2],
      dev: true,
      isButtonDisabled: false,
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
        @dev={{this.dev}} 
      />
    `);

    assert.dom('[data-test-signup]').hasText('Submit');
  });

  test('progress through two step process in non-dev mode', async function (assert) {
    assert.expect(2);

    this.setProperties({
      currentStep: NEW_SIGNUP_STEPS[1],
      isButtonDisabled: false,
      isLoading: false,
      isDevMode: false,
      handleInputChange: () => {},
      changeStep: (nextStep) => {
        this.set('currentStep', nextStep);
      },
      register: () => {},
    });

    await render(hbs`<NewSignup
      @isDevMode={{this.isDevMode}}
      @handleInputChange={{this.handleInputChange}}
      @changeStep={{this.changeStep}}
      @register={{this.register}}
    />`);

    assert.dom('[data-test-signup-form-label]').hasText('First Name');
    await fillIn('[data-test-signup-form-input]', superUserData.first_name);
    await click('[data-test-signup]');

    assert.dom('[data-test-signup-form-label]').hasText('Last Name');
    await fillIn('[data-test-signup-form-input]', superUserData.last_name);
    await click('[data-test-signup]');
  });

  test('progresses through extra username step in dev mode', async function (assert) {
    assert.expect(3);

    this.setProperties({
      currentStep: NEW_SIGNUP_STEPS[1],
      isButtonDisabled: false,
      isLoading: false,
      isDevMode: true,
      handleInputChange: () => {},
      handleCheckboxInputChange: () => {},
      changeStep: (nextStep) => {
        this.set('currentStep', nextStep);
      },
      register: () => {},
    });

    await render(hbs`<NewSignup
      @isDevMode={{this.isDevMode}}
      @handleInputChange={{this.handleInputChange}}
      @handleCheckboxInputChange={{this.handleCheckboxInputChange}}
      @changeStep={{this.changeStep}}
      @register={{this.register}}
    />`);

    assert.dom('[data-test-signup-form-label]').hasText('First Name');
    await fillIn('[data-test-signup-form-input]', superUserData.first_name);
    await click('[data-test-signup]');

    assert.dom('[data-test-signup-form-label]').hasText('Last Name');
    await fillIn('[data-test-signup-form-input]', superUserData.last_name);
    await click('[data-test-signup]');

    assert.dom('[data-test-signup-form-label]').hasText('Username');
    await fillIn('[data-test-signup-form-input]', superUserData.username);
    await click('[data-test-signup]');
  });
});
