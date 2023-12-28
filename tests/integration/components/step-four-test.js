import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | step-four', function (hooks) {
  setupRenderingTest(hooks);

  test('step four renders', async function (assert) {
    assert.expect(27);

    await render(hbs`<JoinSteps::StepFour />`);

    const joinData = [
      {
        id: 'one',
        label: 'First Name',
        data: '',
      },
      {
        id: 'two',
        label: 'Last Name',
        data: '',
      },
      {
        id: 'three',
        label: 'Your City',
        data: '',
      },
      {
        id: 'four',
        label: 'Your State',
        data: '',
      },
      {
        id: 'five',
        label: 'Your Country',
        data: '',
      },
      {
        id: 'six',
        label: 'Your Introduction',
        data: '',
      },
      {
        id: 'seven',
        label: 'Your Skills',
        data: '',
      },
      {
        id: 'eight',
        label: 'Your Institution',
        data: '',
      },
      {
        id: 'nine',
        label: 'What do you do for fun?',
        data: '',
      },
      {
        id: 'ten',
        label: 'Fun facts about you',
        data: '',
      },
      {
        id: 'eleven',
        label: 'Why do you want to join Real Dev Squad?',
        data: '',
      },
      {
        id: 'twelve',
        label: 'How many hours per week, are you willing to contribute?',
        data: '',
      },
      {
        id: 'thirteen',
        label: 'How did you hear about us?',
        data: '',
      },
    ];

    assert
      .dom('[data-test-validate-text]')
      .hasText('Please validate before submitting');

    joinData.forEach((data) => {
      assert.dom(`[data-test-join-label=${data.id}]`).hasText(data.label);
      assert.dom(`[data-test-join-data=${data.id}]`).exists();
    });
  });
});
