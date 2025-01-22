import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/step2', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the initial state correctly', async function (assert) {
    this.set('setState', () => {});
    this.set('profileURL', '');
    await render(
      hbs`<Identity::Step2 @setState={{this.setState}} @profileURL={{this.profileURL}} />`,
    );

    assert
      .dom('[data-test-step2-heading]')
      .hasText('Step 2: Profile Service URL');
    assert.dom('[data-test-step2-desc]').exists();
    assert.dom('[data-test-step2-input]').exists();
    assert.dom('[data-test-step2-next-button]').doesNotExist();
  });

  test('it shows next button when URL is entered', async function (assert) {
    this.set('setState', () => {});
    this.set('profileURL', '');
    await render(
      hbs`<Identity::Step2 @setState={{this.setState}} @profileURL={{this.profileURL}} />`,
    );

    assert.dom('[data-test-step2-next-button]').doesNotExist();

    await fillIn('[data-test-step2-input]', 'https://my-profile-service.com');

    assert.dom('[data-test-step2-next-button]').exists();
    assert.dom('[data-test-step2-next-button]').hasText('Next');
  });

  test('it handles next button click and shows loader', async function (assert) {
    let nextClicked = false;
    this.set('setState', () => (nextClicked = true));
    this.set('profileURL', '');
    await render(
      hbs`<Identity::Step2 @setState={{this.setState}} @profileURL={{this.profileURL}} />`,
    );

    await fillIn('[data-test-step2-input]', 'https://my-profile-service.com');
    await click('[data-test-step2-next-button]');

    assert.true(nextClicked, 'Next button should trigger setState');
  });

  test('it shows loader while saving URL', async function (assert) {
    this.set('setState', () => {});
    this.set('savingURL', true);
    this.set('profileURL', '');
    await render(hbs`
      <Identity::Step2 
        @setState={{this.setState}}
        @savingURL={{this.savingURL}}
        @profileURL={{this.profileURL}}
      />`);

    await fillIn('[data-test-step2-input]', 'https://my-profile-service.com');

    assert.dom('.loader').exists('Loader should be visible when saving');
    assert
      .dom('[data-test-step2-next-button]')
      .doesNotContainText(
        'Next',
        'Next text should not be visible while loading',
      );
  });
});
