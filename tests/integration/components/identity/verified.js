import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/verified', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the success message correctly', async function (assert) {
    await render(hbs`<Identity::Verified />`);

    assert.dom('[data-test-verified-heading]').hasText('Verified');
    assert.dom('[data-test-verified-desc]').exists();
    assert
      .dom('[data-test-verified-desc] span')
      .hasClass('identity-box-desc-bold');
    assert.dom('[data-test-verified-desc] span').hasText('Congratulations!!!');
  });
});
