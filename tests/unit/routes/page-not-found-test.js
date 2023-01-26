import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { visit} from '@ember/test-helpers';
module('Unit | Route | page-not-found', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:page-not-found');
    assert.ok(route);
  });
  test('visiting /*', async function (assert) {
    await visit('/*');

    assert
      .dom('.page-not-found .page-not-found-img') 
      .hasAttribute('src', '../assets/images/not-found.png')
      .hasAttribute('alt', 'not-found');
    assert.dom('.page-not-found .page-not-found-text').hasText("The page you're looking for cannot be found!");
  });
});
