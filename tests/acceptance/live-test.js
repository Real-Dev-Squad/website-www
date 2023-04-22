import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';
import { later } from '@ember/runloop';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);

  test('skeleton exists!', async function (assert) {
    assert.expect(3);
    await visit('/live');

    assert.strictEqual(currentURL(), '/live', 'We are on the live page!');

    assert.dom('[data-test-skeleton]').exists();
    assert.dom('[data-test-video]').doesNotExist();
  });

  test('video exists!', async function (assert) {
    assert.expect(5);
    await visit('/live');

    const controller = this.owner.lookup('controller:live');

    assert.strictEqual(currentURL(), '/live', 'We are on the live page!');
    assert.dom('[data-test-tabs]').exists();

    await new Promise((resolve) => later(resolve, 4000));

    this.set('pageLoading', controller.get('isLoading'));

    assert.false(this.pageLoading, 'State changed to false!');
    assert.dom('[data-test-video]').exists();
    assert.dom('[data-test-skeleton]').doesNotExist();
  });
});
