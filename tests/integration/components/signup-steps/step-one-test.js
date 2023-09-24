import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, typeIn, select, click } from '@ember/test-helpers';
import { set } from '@ember/object';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('RealSevSquad logo render on signupDetails page', async function (assert) {
    assert.expect(2);
    await render(hbs`<SignupSteps::StepOne/>`);
    assert
      .dom('[data-test-rds-logo]')
      .hasAttribute('src', 'assets/icons/onboarding-card-rds-logo.png')
      .hasAttribute('alt', 'RDS-Logo');
  });

  test('heading render on signupDetails page', async function (assert) {
    assert.expect(1);
    await render(hbs`<SignupSteps::StepOne/>`);
    assert
      .dom('[data-test-required-heading]')
      .hasText('Sign up to your account');
  });

  test('render firstname input field on signupDetails page', async function (assert) {
    assert.expect(13);
    this.set('name', 'firstname');
    this.set('field', 'First Name');
    this.set('placeHolder', 'Write your first name');
    this.set('type', 'text');
    this.set('required', true);
    this.set('value', '');
    this.set('disabled', false);
    this.set('onInput', (e) => {
      this.value = e.target.value;
      this.handleInputChange('firstname', this.value);
    });

    this.set('handleInputChange', (inputName, inputValue) => {
      this.name = inputName;
      this.value = inputValue;
    });

    await render(
      hbs`<SignupSteps::StepOne @onChange={{this.handleInputChange}}/>`
    );

    assert.dom('[data-test-input]').hasClass('input-box');

    assert.dom('[data-test-label]').hasClass('label');
    assert.dom('[data-test-label]').hasText('First Name');
    assert.dom('[data-test-label]').hasAttribute('for', 'firstname');

    assert.dom('[data-test-required]').hasClass('required');

    assert.dom('[data-test-input-field]').hasClass('input__field');
    assert.dom('[data-test-input-field]').hasAttribute('required');
    assert.dom('[data-test-input-field]').hasAttribute('name', 'firstname');
    assert.dom('[data-test-input-field]').hasProperty('type', 'text');
    assert.dom('[data-test-input-field]').hasAttribute('id', 'firstname');
    assert
      .dom('[data-test-input-field]')
      .hasProperty('placeholder', 'Write your first name');
    assert.dom('[data-test-input-field]').hasProperty('value', '');
    await typeIn('[data-test-input-field]', 'shubham');
    assert.strictEqual(this.value, 'shubham');
  });

  test('it updates firstname in signupDetails when handleInputChange is triggered', async function (assert) {
    assert.expect(1);
    this.set('signupDetails', {
      firstname: '',
    });

    this.set('handleInputChange', (key, value) => {
      set(this.signupDetails, key, value);
    });

    await render(hbs`
    <SignupSteps::StepOne @onChange={{this.handleInputChange}} />
  `);

    await typeIn('[data-test-input-field]', 'shubham');

    assert.strictEqual(
      this.signupDetails.firstname,
      'shubham',
      'signupDetails.firstname was updated'
    );
  });

  test('it render disable username input field and disable Generate Username button on signupDetails page', async function (assert) {
    assert.expect(19);

    await render(hbs`<SignupSteps::StepOne/>`);

    assert
      .dom('[data-test-input-field=username]')
      .hasAttribute('name', 'username');
    assert.dom('[data-test-input=username]').hasClass('input-box');
    assert.dom('[data-test-input=username]').hasClass('input-box--btn');

    assert.dom('[data-test-label=username]').hasClass('label');
    assert.dom('[data-test-label=username]').hasText('Username');
    assert.dom('[data-test-label=username]').hasAttribute('for', 'username');

    assert.dom('[data-test-required=username]').hasClass('required');

    assert.dom('[data-test-input-field=username]').hasClass('input__field');
    assert.dom('[data-test-input-field=username]').hasClass('input-disable');

    assert.dom('[data-test-input-field=username]').hasAttribute('required');
    assert
      .dom('[data-test-input-field=username]')
      .hasAttribute('name', 'username');
    assert.dom('[data-test-input-field=username]').hasProperty('type', 'text');
    assert
      .dom('[data-test-input-field=username]')
      .hasAttribute('id', 'username');
    assert
      .dom('[data-test-input-field=username]')
      .hasProperty('disabled', true);

    assert.dom('[data-test-button=generateUsername]').exists();
    assert
      .dom('[data-test-button=generateUsername]')
      .hasClass('btn-generateUsername');
    assert
      .dom('[data-test-button=generateUsername]')
      .hasProperty('type', 'button');
    assert
      .dom('[data-test-button=generateUsername]')
      .hasText('Generate Username');
    assert
      .dom('[data-test-button=generateUsername]')
      .hasProperty('disabled', true);
  });

  test('generateUsername button is enabled when firstname and lastname input fields are not empty and valid input', async function (assert) {
    assert.expect(1);
    this.set('onInput', (e) => {
      this.value = e.target.value;
      this.handleInputChange('firstname', this.value);
      this.handleInputChange('lastname', this.value);
    });
    this.set('handleInputChange', (inputName, inputValue) => {
      this.name = inputName;
      this.value = inputValue;
    });
    await render(
      hbs`<SignupSteps::StepOne @onChange={{this.handleInputChange}}/>`
    );
    await typeIn('[data-test-input-field=firstname]', 'shubham');
    await typeIn('[data-test-input-field=lastname]', 'sigdar');
    assert
      .dom('[data-test-button=generateUsername]')
      .hasProperty('disabled', false);
  });

  test('render select your role dropdown on signup details page and update signupdetails.role object ', async function (assert) {
    assert.expect(13);
    this.set('signupDetails', {
      role: {},
    });

    this.set('handleInputChange', (selectRoleName, selectOptionValue) => {
      this.name = selectRoleName;
      this.value = selectOptionValue;
      if (selectRoleName === 'role') {
        this.signupDetails.role = {};
        set(this.signupDetails.role, this.value, true);
      }
    });

    await render(
      hbs`<SignupSteps::StepOne @onChange={{this.handleInputChange}} />`
    );

    assert.dom('[data-test-dropdown]').hasClass('dropdown');

    assert.dom('[data-test-required]').hasClass('required');

    assert.dom('[data-test-dropdown-field]').hasClass('dropdown__field');
    assert.dom('[data-test-dropdown-field]').hasAttribute('required');
    assert.dom('[data-test-dropdown-field]').hasAttribute('name', 'role');
    assert.dom('[data-test-dropdown-field]').hasAttribute('id', 'role');

    assert.dom('[data-test-dropdown-option]').exists({ count: 4 });

    assert.dom('[data-test-dropdown-default]').hasText('Choose Your Role');
    assert.dom('[data-test-dropdown-default]').hasAttribute('disabled');
    assert.dom('[data-test-dropdown-default]').hasAttribute('selected');

    select('[data-test-dropdown-field]', 'Developer');
    await click('[data-test-dropdown-option="Developer"]');
    assert.dom('[data-test-dropdown-field]').hasValue('Developer');
    assert.strictEqual(this.value, 'developer', 'changed correctly');
    assert.true(
      this.signupDetails.role.developer,
      'signupDetails.role is updated'
    );
  });

  test('It display error message and disable the button for invalid input', async function (assert) {
    assert.expect(2);
    this.set('handleInputChange', (inputName, inputValue) => {
      this.name = inputName;
      this.value = inputValue;
    });
    await render(
      hbs`<SignupSteps::StepOne  @onChange={{this.handleInputChange}} />`
    );
    await typeIn('[data-test-input-field=firstname]', 'shubham_1');
    await typeIn('[data-test-input-field=lastname]', 'sigdar@');
    assert.dom('.error__message').exists();
    assert
      .dom('[data-test-button=generateUsername]')
      .hasProperty('disabled', true);
  });

  skip('It render the signup button for role developer', async function (assert) {
    assert.expect(2);
    this.set('data', { role: 'developer' });
    this.set('isSignupButtonDisabled', false);
    await render(
      hbs`<SignupSteps::StepOne @data={{this.data}} @isSignupButtonDisabled={{this.isSignupButtonDisabled}}>`
    );

    assert.dom('[data-test-button=signup]').exists();
    assert.dom('[data-test-button=signup]').hasText('Signup');
    assert.dom('[data-test-button=signup]').hasProperty('disabled', false);
  });

  skip('It render the next button for role maven', async function (assert) {
    assert.expect(2);
    this.set('data', { role: 'maven' });
    this.set('isSignupButtonDisabled', false);
    await render(
      hbs`<SignupSteps::StepOne @data={{this.data}} @isSignupButtonDisabled={{this.isSignupButtonDisabled}}>`
    );

    assert.dom('[data-test-button=next]').exists();
    assert.dom('[data-test-button=next]').hasText('Next');
    assert.dom('[data-test-button=next]').hasProperty('disabled', false);
  });
});
