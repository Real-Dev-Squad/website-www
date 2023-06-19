import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(10);

    const PANEL_BUTTON = [
      {
        id: 'screen-share',
        icon: 'material-symbols:screen-share',
        className: 'icon-button--md',
      },
      {
        id: 'participants',
        icon: 'material-symbols:group',
        className: 'icon-button--md',
      },
      {
        id: 'start',
        icon: 'material-symbols:arrow-forward-ios-rounded',
        className: 'icon-button--md icon-button--pink-bg',
      },
    ];

    await render(hbs`<LivePanel />`);

    assert.dom('[data-test-live-panel]').exists();

    PANEL_BUTTON.forEach((button) => {
      assert.dom(`[data-test-icon-button=${button.id}]`).exists();
      assert
        .dom(`[data-test-icon-button=${button.id}]`)
        .hasClass('icon-button--md');
      assert.dom(`[data-test-icon=${button.id}]`).exists();
    });
  });
});
