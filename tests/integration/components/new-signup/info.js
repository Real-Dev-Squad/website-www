import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | new-signup/info', function (hooks) {
  setupRenderingTest(hooks);

  test('renders correct heading and button on GET_STARTED step', async function (assert) {
    this.set('currentStep', 'getStarted');
    this.set('onClick', () => {});

    await render(hbs`
      <NewSignup::Info @currentStep={{this.currentStep}} @onClick={{this.onClick}} />
    `);

    assert.dom('[data-test-mainHeading]').hasText('Use Features');
    assert.dom('[data-test-get-started-btn]').exists();
    assert.dom('[data-test-get-started-btn] button').hasText('Get Started');
  });

  test('renders thank you heading on LAST_STEP', async function (assert) {
    this.set('currentStep', 'lastStep');
    this.set('onClick', () => {});

    await render(hbs`
      <NewSignup::Info @currentStep={{this.currentStep}} @onClick={{this.onClick}} />
    `);

    assert.dom('[data-test-mainHeading]').hasText('Thank You');
    assert.dom('[data-test-get-started-btn] button').hasText("Let's Go");
  });
});
