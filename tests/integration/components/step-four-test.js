import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | step-four', function (hooks) {
  setupRenderingTest(hooks);

  test('step four renders', async function (assert) {
    assert.expect(23);

    await render(hbs`<JoinSteps::StepFour />`);

    const joinData = [
      {
        id: 'one',
        key: 'city',
        label: 'Your City',
        data: '',
      },
      {
        id: 'two',
        key: 'state',
        label: 'Your State',
        data: '',
      },
      {
        id: 'three',
        key: 'country',
        label: 'Your Country',
        data: '',
      },
      {
        id: 'four',
        key: 'introduction',
        label: 'Your Introduction',
        data: '',
      },
      {
        id: 'five',
        key: 'skills',
        label: 'Your Skills',
        data: '',
      },
      {
        id: 'six',
        key: 'college',
        label: 'Your Institution',
        data: '',
      },
      {
        id: 'seven',
        key: 'forFun',
        label: 'What do you do for fun?',
        data: '',
      },
      {
        id: 'eight',
        key: 'funFact',
        label: 'Fun facts about you',
        data: '',
      },
      {
        id: 'nine',
        key: 'whyRds',
        label: 'Why do you want to join Real Dev Squad?',
        data: '',
      },
      {
        id: 'ten',
        key: 'numberOfHours',
        label: 'How many hours per week, are you willing to contribute?',
        data: '',
      },
      {
        id: 'eleven',
        key: 'foundFrom',
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
