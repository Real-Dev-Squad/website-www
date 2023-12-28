import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | description', function (hooks) {
  setupRenderingTest(hooks);

  test("old description content doesn't renders", async function (assert) {
    assert.expect(3);

    await render(hbs`<Description />`);

    assert.dom('[data-test-description-img]').doesNotExist();
    assert.dom('[data-test-description-title]').doesNotExist();
    assert.dom('[data-test-description-content]').doesNotExist();
  });

  test('new description content renders', async function (assert) {
    assert.expect(5);

    await render(hbs`<Description />`);

    assert.dom('[data-test-description-section]').exists();
    assert.dom('[data-test-description-section-title]').exists();
    assert.dom('[data-test-description-section-content]').exists();

    assert.dom('[data-test-description-section-content="para-first"]').exists();
    assert
      .dom('[data-test-description-section-content="para-second"]')
      .exists();
  });
});
