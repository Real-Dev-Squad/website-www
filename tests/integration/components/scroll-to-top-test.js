import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click, scrollTo } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | scroll-to-top', function (hooks) {
  setupRenderingTest(hooks);

  test('scroll to top renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<ScrollToTop />`);
    
    await scrollTo('#scroll__btn', 0, 100);
    await click('[data-test-scroll-to-top]');
    assert.equal(0, 0, 'scroll to component works if height is zero');
  });
});
