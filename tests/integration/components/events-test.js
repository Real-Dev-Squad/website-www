import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | events', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: add tests after events section is out of feature flag
  test('it renders empty without feature flag', async function (assert) {
    await render(hbs`<Events />`);

    assert.dom(this.element).hasText('');

    await render(hbs`
      <Events />
    `);

    assert.dom(this.element).hasText('');
  });
});
