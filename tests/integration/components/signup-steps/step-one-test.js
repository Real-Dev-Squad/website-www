import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, typeIn, select, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('heading render on signupDetails page', async function (assert) {
    assert.expect(1);
    await render(hbs`<SignupSteps::StepOne />`);
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

    await render(hbs`<SignupSteps::StepOne />`);

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
    assert.dom('[data-test-input-field]').hasProperty('value', 'shubham');
  });

  test('render select your role dropdown on signup details page ', async function (assert) {
    assert.expect(11);

    await render(hbs`<SignupSteps::StepOne />`);

    assert.dom('[data-test-dropdown]').hasClass('dropdown');

    assert.dom('[data-test-required]').hasClass('required');

    assert.dom('[data-test-dropdown-field]').hasClass('dropdown__field');
    assert.dom('[data-test-dropdown-field]').hasAttribute('required');
    assert.dom('[data-test-dropdown-field]').hasAttribute('name', 'role');
    assert.dom('[data-test-dropdown-field]').hasAttribute('id', 'role');

    assert.dom('[data-test-dropdown-option]').exists({ count: 1 });

    assert.dom('[data-test-dropdown-default]').hasText('Choose Your Role');
    assert.dom('[data-test-dropdown-default]').hasAttribute('disabled');
    assert.dom('[data-test-dropdown-default]').hasAttribute('selected');

    select('[data-test-dropdown-field]', 'Developer');
    await click('[data-test-dropdown-option="Developer"]');
    assert.dom('[data-test-dropdown-field]').hasValue('Developer');
  });

  test('It display error message and disable the button for invalid input', async function (assert) {
    assert.expect(2);

    await render(hbs`<SignupSteps::StepOne  />`);
    await typeIn('[data-test-input-field=firstname]', 'shubham_1');
    await typeIn('[data-test-input-field=lastname]', 'sigdar@');
    assert.dom('.error__message').exists();
    assert.dom('[data-test-button=signup]').hasProperty('disabled', true);
  });

  // TODO : remove this skip when opening onboarding for different roles - maven, product manager, designer
  test.skip('it renders label and input checkbox when Maven role is chosen', async function (assert) {
    assert.expect(8);

    await render(hbs`<SignupSteps::StepOne />`);

    select('[data-test-dropdown-field]', 'Maven');
    await click('[data-test-dropdown-option="Maven"]');

    assert.dom('[data-test-checkbox]').hasClass('role-confirmation__field');
    assert.dom('[data-test-label=maven-role]').hasClass('checkbox-label');
    assert
      .dom('[data-test-label=maven-role]')
      .hasText('Are you sure about mentoring people in RealDevSquad?');

    assert
      .dom('[data-test-label=maven-role]')
      .hasAttribute('for', 'maven-role');
    assert.dom('[data-test-checkbox-field]').hasClass('checkbox-input');
    assert.dom('[data-test-checkbox-field]').hasProperty('type', 'checkbox');
    assert.dom('[data-test-checkbox-field]').hasAttribute('id', 'maven-role');
    assert.dom('[data-test-checkbox-field]').hasProperty('checked', false);
  });

  test('It render the signup button', async function (assert) {
    assert.expect(2);
    await render(
      hbs`<SignupSteps::StepOne @onChange={{this.handleInputChange}}/>`,
    );
    select('[data-test-dropdown-field]', 'Developer');
    await click('[data-test-dropdown-option="Developer"]');

    assert.dom('[data-test-button=signup]').exists();
    assert.dom('[data-test-button=signup]').hasText('Signup');
  });

  test('signup button should be enabled when all required fields are filled', async function (assert) {
    assert.expect(1);

    await render(hbs`<SignupSteps::StepOne />`);

    await typeIn('[data-test-input-field=firstname]', 'shubham');
    await typeIn('[data-test-input-field=lastname]', 'sigdar');

    select('[data-test-dropdown-field]', 'Developer');
    await click('[data-test-dropdown-option="Developer"]');

    assert.dom('[data-test-button=signup]').hasProperty('disabled', false);
  });
});
