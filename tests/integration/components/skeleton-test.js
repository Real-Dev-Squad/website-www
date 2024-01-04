import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | skeleton', function (hooks) {
  setupRenderingTest(hooks);

  test('skeleton renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<Reusables::Skeleton />`);

    assert.dom('[data-test-skeleton]').exists();
  });
});
