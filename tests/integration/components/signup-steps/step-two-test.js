import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-two', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the "Congratulations" message', async function (assert) {
    assert.expect(1);
    this.set('startHandler', async () => {
      await click('[data-test-button=lets-go]');
    });

    await render(
      hbs`<SignupSteps::StepTwo @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test-getting-started-heading]')
      .hasText('Congratulations', 'Displays "Congratulations" heading');
  });

  test('it renders the "Let\'s Get Started" button if role is Developer', async function (assert) {
    assert.expect(2);

    window.localStorage.setItem('role', 'Developer');

    this.set('startHandler', async () => {
      await click('[data-test-button=lets-go]');
    });
    await render(
      hbs`<SignupSteps::StepTwo @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-button=lets-go]')
      .hasText("Let's Get Started", 'Displays "Let\'s Get Started" button');
    assert.dom('[data-test-button=lets-go]').hasProperty('type', 'button');
    window.localStorage.clear();
  });

  test('it renders the "Join Our Discord" button if role is Maven', async function (assert) {
    assert.expect(2);

    window.localStorage.setItem('role', 'Maven');

    this.set('startHandler', async () => {
      await click('[data-test-button=Join-Discord]');
    });
    await render(
      hbs`<SignupSteps::StepTwo @startHandler={{this.startHandler}} />`
    );

    assert
      .dom('[data-test-button=Join-Discord]')
      .hasText('Join Our Discord', 'Displays "Join Our Discord" button');
    assert.dom('[data-test-button=Join-Discord]').hasProperty('type', 'button');
    window.localStorage.clear();
  });

  test('clicking "Let\'s Get Started" button triggers startHandler', async function (assert) {
    assert.expect(1);
    window.localStorage.setItem('role', 'Developer');
    this.set('startHandler', () => {
      assert.ok(true, 'startHandler was called');
    });

    await render(
      hbs`<SignupSteps::StepTwo @startHandler={{this.startHandler}} />`
    );

    await click('[data-test-button=lets-go]');
    window.localStorage.clear();
  });

  test('it renders the description text for user who choose Developer role', async function (assert) {
    assert.expect(1);
    window.localStorage.setItem('role', 'Developer');
    this.set('startHandler', async () => {
      await click('[data-test-button=lets-go]');
    });
    await render(
      hbs`<SignupSteps::StepTwo @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test-getting-started-paragraph]')
      .hasText("Let's get your journey started with Real Dev Squad");
    window.localStorage.clear();
  });

  test('it renders the description text for user who choose Maven role', async function (assert) {
    assert.expect(1);
    window.localStorage.setItem('role', 'Maven');
    this.set('startHandler', async () => {
      await click('[data-test-button=Join-Discord]');
    });
    await render(
      hbs`<SignupSteps::StepTwo @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test-getting-started-paragraph]')
      .hasText(
        'You can now join our Discord server where we do our discussions, learning and mentoring stuff'
      );
    window.localStorage.clear();
  });
});
