import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(16);

    const PANEL_BUTTON = [
      {
        id: 'screen-share',
        srcImg: '/assets/icons/screen-share-icon.png',
        className: 'icon-button--md',
        alt: 'screen share button',
      },
      {
        id: 'participants',
        srcImg: '/assets/icons/people-icon.png',
        className: 'icon-button--md',
        alt: 'participant button',
      },
    ];

    await render(hbs`<LivePanel />`);

    assert.dom('[data-test-live-panel]').exists();

    assert.dom('[data-test-button=start-live]').exists();

    PANEL_BUTTON.forEach((button) => {
      assert.dom(`[data-test-icon-button=${button.id}]`).exists();
      assert
        .dom(`[data-test-icon-button=${button.id}]`)
        .hasClass('icon-button--md');
      assert.dom(`[data-test-iconbtn-img=${button.id}]`).exists();
      assert.dom(`[data-test-iconbtn-img=${button.id}]`).hasAttribute('src');
      assert.dom(`[data-test-iconbtn-img=${button.id}]`).hasAttribute('alt');
      assert.strictEqual(
        document
          .querySelector(`[data-test-iconbtn-img=${button.id}]`)
          .getAttribute('src'),
        button.srcImg,
        'source is same!'
      );
      assert.strictEqual(
        document
          .querySelector(`[data-test-iconbtn-img=${button.id}]`)
          .getAttribute('alt'),
        button.id,
        'alt attribute is same!'
      );
    });
  });
});
