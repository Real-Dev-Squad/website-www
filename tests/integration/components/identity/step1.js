import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/step1', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the initial state correctly', async function (assert) {
    this.set('setState', () => {});
    await render(hbs`<Identity::Step1 @setState={{this.setState}}/>`);

    assert
      .dom('[data-test-step1-heading]')
      .hasText('Step 1: Chaincode Generation');
    assert.dom('[data-test-step1-desc]').exists();
    assert.dom('[data-test-step1-button]').hasText('Generate Chaincode');
    assert.dom('[data-test-step1-next-button]').doesNotExist();
  });

  test('it handles chaincode generation', async function (assert) {
    this.set('setState', () => {});
    await render(hbs`<Identity::Step1 @setState={{this.setState}}/>`);

    await click('[data-test-step1-button]');
    await waitFor('.identity-chaincode-box');

    assert.dom('[data-test-step1-chaincode]').hasText('********************');
    assert.dom('[data-test-step1-next-button]').exists();
    assert.dom('[data-test-step1-button]').doesNotExist();
  });

  test('it toggles chaincode visibility', async function (assert) {
    this.set('setState', () => {});
    await render(hbs`<Identity::Step1 @setState={{this.setState}}/>`);

    await click('[data-test-step1-button]');
    await waitFor('.identity-chaincode-box');

    const initialText = await document
      .querySelector('[data-test-step1-chaincode]')
      .textContent.trim();
    await click('[data-test-step1-eye]');
    const visibleText = await document
      .querySelector('[data-test-step1-chaincode]')
      .textContent.trim();

    assert.notEqual(
      initialText,
      visibleText,
      'Chaincode visibility should toggle',
    );
    assert.notEqual(
      visibleText,
      '********************',
      'Chaincode should be visible',
    );
  });

  test('it handles next button click', async function (assert) {
    let nextClicked = false;
    this.set('setState', () => (nextClicked = true));
    await render(hbs`<Identity::Step1 @setState={{this.setState}}/>`);

    await click('[data-test-step1-button]');
    await waitFor('[data-test-step1-next-button]');
    await click('[data-test-step1-next-button]');

    assert.true(nextClicked, 'Next button should trigger setState');
  });
});
