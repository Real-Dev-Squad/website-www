import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, typeIn } from '@ember/test-helpers';
import { set } from '@ember/object';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('render firstname input field', async function (assert) {
    assert.expect(13);
    this.set('name', 'firstname');
    this.set('field', 'First Name');
    this.set('placeHolder', 'Write your first name');
    this.set('type', 'text');
    this.set('required', true);
    this.set('value', '');
    this.set('onInput', (e) => {
      // Update the input value when the input changes
      this.value = e.target.value;
      // Call handleInputChange with the current value
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
});
