import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the live header', async function (assert) {
    await render(hbs`<LiveHeader />`);

    assert.dom('[data-test-tabs]').exists();
  });

  test('it should change the tab when click on non active tab', async function (assert) {
    this.set('tabs', [
      { id: 1, label: 'Screenshare', active: true },
      { id: 2, label: 'Previous Events', active: false },
      { id: 3, label: 'Real Dev Squad', active: false },
    ]);
    this.set('tabHandler', (tabId) => {
      const newTabs = this.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, active: true } : { ...tab, active: false }
      );
      this.set('tabs', newTabs);
    });

    await render(
      hbs`<LiveHeader @tabs={{this.tabs}} @tabHandler={{this.tabHandler}} />`
    );

    assert.dom('[data-test-tab="Previous Events"]').exists();
    assert.dom('[data-test-tab="Previous Events"]').hasNoClass('active');

    await click('[data-test-tab="Previous Events"]');

    assert.dom('[data-test-tab="Previous Events"]').hasClass('active');
  });
});
