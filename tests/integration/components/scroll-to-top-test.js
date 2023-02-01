import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | scroll-to-top', function (hooks) {
  setupRenderingTest(hooks);

  test('scroll to top renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<ScrollToTop />`);
    
    await click('[data-test-scroll-to-top]');
    scrollTo('#scroll__btn',0,0);
    assert.dom('[data-test-scroll-icon]').exists();
  });
});
