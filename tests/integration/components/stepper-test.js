import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stepper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(12);

    await render(hbs`<Stepper />`);

    assert
      .dom(`[data-test-message=one]`)
      .hasText('Hi there 👋, let’s get you started on joining formalities');
    assert.dom('[data-test-step-detail]').doesNotExist();

    await click('[data-test-button=start]');
    assert
      .dom(`[data-test-message=two]`)
      .hasText(
        'You are just a few steps 🪜 away from getting a personalized invite'
      );
    assert
      .dom('[data-test-step-detail]')
      .hasText('Step 1 of 4 : Personal Details');

    await click('[data-test-button=next]');
    assert
      .dom(`[data-test-message=three]`)
      .hasText('Let’s help others 🫂 know you and your skills');
    assert.dom('[data-test-step-detail]').hasText('Step 2 of 4 : Introduction');

    await click('[data-test-button=next]');
    assert
      .dom(`[data-test-message=four]`)
      .hasText('Let’s help the verifier understand 🤔 you better');
    assert
      .dom('[data-test-step-detail]')
      .hasText('Step 3 of 4 : Why Real Dev Squad?');

    await click('[data-test-button=next]');
    assert
      .dom(`[data-test-message=five]`)
      .hasText('Here’s a preview 👀 of the data you entered');
    assert.dom('[data-test-step-detail]').hasText('Step 4 of 4 : Preview');

    await click('[data-test-button=submit]');
    assert
      .dom(`[data-test-message=six]`)
      .hasText('Thank you 🫂 for completing all the steps');
    assert.dom('[data-test-step-detail]').doesNotExist();
  });
});
