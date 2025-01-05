import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/step3', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the initial state correctly', async function (assert) {
    await render(hbs`<Identity::Step3 />`);

    assert
      .dom('[data-test-step3-heading]')
      .hasText('Step 3: Link Profile Service');
    assert.dom('[data-test-step3-desc]').exists();
    assert.dom('[data-test-step3-button]').hasText('Link');
  });

  test('it shows loader while linking', async function (assert) {
    this.set('linking', true);
    await render(hbs`<Identity::Step3 @linking={{this.linking}} />`);

    assert.dom('.loader').exists('Loader should be visible when linking');
    assert
      .dom('[data-test-step3-button]')
      .doesNotContainText(
        'Link',
        'Link text should not be visible while loading',
      );
  });

  test('it handles link button click', async function (assert) {
    let linkClicked = false;
    this.set('handleLink', () => (linkClicked = true));
    await render(hbs`<Identity::Step3 @handleLink={{this.handleLink}} />`);

    await click('[data-test-step3-button]');

    assert.true(linkClicked, 'Link button should trigger handleLink action');
  });
});
