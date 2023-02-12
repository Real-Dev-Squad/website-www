import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | join-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content for join-section component', async function (assert) {
    await render(hbs`<JoinSection />`);

    assert.dom('.join-section').exists();
    assert.dom('.join-section .join__h2').exists();
    assert.dom('.join-section .join__h2').hasText('Real Dev Squad');
    assert.dom('[data-test-para="1"]').exists();
    assert.dom('[data-test-para="2"]').exists();
    assert.dom('.join-section .join_p').exists();
    assert.dom('.join-section a.button').exists();
  });
});
