import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
// import { EVENTS_CATEGORIES } from '../../constants/events-data';

module('Integration | Component | footer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    class RouterStub extends Service {
      currentRoute = { name: 'index' };
    }

    this.owner.register('service:router', RouterStub);
  });

  test('footer renders', async function (assert) {
    assert.expect(6);

    this.set('isHome', true);

    await render(hbs`<Footer @isHome={{this.isHome}} />`);

    assert.dom('[data-test-events-section]').doesNotExist();
    /*
     Events section is to be migrated, will use it once its done,
     track it here https://github.com/Real-Dev-Squad/website-www/issues/787
     */
    // for (const eventCategory in EVENTS_CATEGORIES) {
    //   assert.dom(`[data-test-events-category="${eventCategory}"]`).exists();
    //   EVENTS_CATEGORIES[eventCategory].forEach((event) => {
    //     assert.dom(`[data-test-events-link="${event.name}"]`).exists();
    //   });
    // }
    assert.dom('[data-test-footer-info]').exists();
    assert.dom('[data-test-footer-info-members-link]').exists();
    assert.dom('[data-test-footer-info-faq-link]').exists();
    assert.dom('[data-test-footer-repo-text]').exists();
    assert.dom('[data-test-footer-repo-link]').exists();
  });
});
