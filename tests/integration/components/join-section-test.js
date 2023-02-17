import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | join-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content for join-section component', async function (assert) {
    assert.expect(11);

    await render(hbs`<JoinSection />`);

    assert.dom('[data-test-join]').exists();
    assert.dom('[data-test-join-title]').exists();
    assert.dom('[data-test-join-title]').hasText('How to Join');
    assert.dom('[data-test-join-title-highlighted]').exists();
    assert.dom('[data-test-join-title-highlighted]').hasText('Real Dev Squad');
    assert.dom('[data-test-para="1"]').exists();
    assert
      .dom('[data-test-para="1"]')
      .hasText(
        'Our squad focuses on quality and we want to work with people who are willing to be serious about their growth in the squad.'
      );
    assert.dom('[data-test-para="2"]').exists();
    assert
      .dom('[data-test-para="2"]')
      .hasText(
        "It's okay if you don't know much yet, but it won't be okay to not put in any efforts for yourself. We want to value everyone's time and efforts."
      );
    assert.dom('[data-test-join-link]').exists();
    assert.dom('[data-test-join-link]').hasText('Join the Squad');
  });
});
