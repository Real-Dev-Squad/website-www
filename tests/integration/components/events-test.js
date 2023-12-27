import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { EVENTS_CATEGORIES } from '../../constants/events-data';

module('Integration | Component | events', function (hooks) {
  setupRenderingTest(hooks);
  /*
    Skipping tests
    Events section is to be migrated, will use it once its done,
    track it here https://github.com/Real-Dev-Squad/website-www/issues/787
  */
  test.skip('events renders', async function (assert) {
    await render(hbs`<Events />`);

    assert.dom('[data-test-events-section]').exists();
    assert.dom('[data-test-events-section-header]').exists();
    for (const eventCategory in EVENTS_CATEGORIES) {
      assert.dom(`[data-test-events-category="${eventCategory}"]`).exists();
      EVENTS_CATEGORIES[eventCategory].forEach((event) => {
        assert.dom(`[data-test-events-link="${event.name}"]`).exists();
      });
    }
  });
});
