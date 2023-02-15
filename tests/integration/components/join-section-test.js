import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | join-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content for join-section component', async function (assert) {
    await render(hbs`<JoinSection />`);

    assert.dom('.join').exists();
    assert.dom('.join .join__titleQuestion').exists();
    assert.dom('.join .join__titleQuestion').hasText('How to Join');
    assert.dom('.join .join__titleHighlighted').exists();
    assert.dom('.join .join__titleHighlighted').hasText('Real Dev Squad');
    assert.dom('[data-test-para="1"]').exists();
    assert.dom('[data-test-para="2"]').exists();
    assert.dom('[data-test-join-button]').exists();
  });
});
