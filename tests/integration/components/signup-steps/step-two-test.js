import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-two', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the "Congratulations" message', async function (assert) {
    assert.expect(1);
    this.set('letsGoHandler', async () => {
      await click('[data-test-button=lets-go]');
    });

    await render(
      hbs`<SignupSteps::StepTwo @letsGoHandler={{this.letsGoHandler}} />`
    );
    assert
      .dom('[data-test-getting-started-heading]')
      .hasText('Congratulations', 'Displays "Congratulations" heading');
  });

  test('it renders the "Let\'s Get Started" button', async function (assert) {
    assert.expect(2);
    this.set('letsGoHandler', async () => {
      await click('[data-test-button=lets-go]');
    });
    await render(
      hbs`<SignupSteps::StepTwo @letsGoHandler={{this.letsGoHandler}} />`
    );
    assert
      .dom('[data-test-button=lets-go]')
      .hasText("Let's Get Started", 'Displays "Let\'s Get Started" button');
    assert.dom('[data-test-button=lets-go]').hasProperty('type', 'button');
  });

  test('clicking "Let\'s Get Started" button triggers letsGoHandler', async function (assert) {
    assert.expect(1);
    this.set('letsGoHandler', () => {
      assert.ok(true, 'letsGoHandler was called');
    });

    await render(
      hbs`<SignupSteps::StepTwo @letsGoHandler={{this.letsGoHandler}} />`
    );

    await click('[data-test-button=lets-go]');
  });

  test('it renders the description text', async function (assert) {
    assert.expect(1);
    this.set('letsGoHandler', async () => {
      await click('[data-test-button=lets-go]');
    });
    await render(
      hbs`<SignupSteps::StepTwo @letsGoHandler={{this.letsGoHandler}} />`
    );
    assert
      .dom('[data-test-getting-started-paragraph]')
      .hasText("Let's get your journey started with Real Dev Squad");
  });
});
