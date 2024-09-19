import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { visit } from '@ember/test-helpers';

module('Unit | Route | debug', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:debug');
    assert.ok(route);
  });

  test('visiting /debug', async function (assert) {
    await visit('/debug');
    assert.expect(1);

    assert.dom('[data-test-debug]').doesNotExist();
  });

  test('visiting /debug under feature flag', async function (assert) {
    await visit('/debug?dev=true');
    assert.expect(1);

    assert.dom('[data-test-debug]').exists();
  });
});
