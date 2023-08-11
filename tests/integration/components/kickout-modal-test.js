import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | kickout-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    assert.expect(5);

    await render(hbs`<KickoutModal />`);

    assert.dom('[data-test-kickout-modal]').exists('data-test-kickout-modal');
    assert
      .dom('[data-test-kickout-heading]')
      .exists('data-test-kickout-heading');
    assert
      .dom('[data-test-kickout-buttons]')
      .exists('data-test-kickout-buttons');
    assert
      .dom('[data-test-button=kickout-button-cancel]')
      .exists('data-test-kickout-button-cancel');
    assert
      .dom('[data-test-button=kickout-button-remove]')
      .exists('data-test-kickout-button-remove');
  });
});
