import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | join-section', function (hooks) {
  setupRenderingTest(hooks);

  test("it shouldn't renders the content for old join-section component", async function (assert) {
    assert.expect(4);

    await render(hbs`<JoinSection />`);

    assert.dom('[data-test-join-title-highlighted]').doesNotExist();
    assert.dom('[data-test-para="1"]').doesNotExist();
    assert.dom('[data-test-para="2"]').doesNotExist();
    assert.dom('[data-test-join-link]').hasText('Join the Squad');
  });

  test('it should renders the content for new join-section component', async function (assert) {
    assert.expect(7);

    await render(hbs`<JoinSection />`);

    const joinButton = document.querySelector('[data-test-join-link]');

    assert.dom('[data-test-join]').exists();
    assert.dom('[data-test-join-title]').exists();
    assert.dom('[data-test-join-title]').hasText('How can you join?');
    assert.dom('[data-test-para="first"]').exists();
    assert.dom('[data-test-join-link]').hasText('Join the Squad');
    assert.ok(joinButton.classList.contains('disabled'));
    assert.dom('[data-test-join-later-text ]').exists();
  });
});
