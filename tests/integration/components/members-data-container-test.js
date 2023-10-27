import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

class MockService extends Service {
  async query() {
    // Mock the query method here
    return [
      { id: 1, name: 'Member 1' },
      { id: 2, name: 'Member 2' },
      { id: 3, name: 'Member 3' },
      { id: 4, name: 'Member 4' },
      { id: 5, name: 'Member 5' },
      { id: 6, name: 'Member 6' },
    ];
  }
}

module('Integration | Component | members-data-container', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // Register the mock service
    this.owner.register('service:store', MockService);
  });

  // TODO: Write this test after having some way to mock api calls
  test('it renders', async function (assert) {
    await render(hbs`<MembersDataContainer />`);
    assert.dom(this.element).hasText('');
  });

  test('it renders with member data', async function (assert) {
    await render(hbs`<MembersDataContainer as |members|>
      <ul>
        {{#each members as |member|}}
          <li>{{member.name}}</li>
        {{/each}}
      </ul>
    </MembersDataContainer>`);

    assert.dom('ul li').exists({ count: 6 });

    assert.dom('ul li').hasAnyText('Member');
  });

  test('it renders with no members', async function (assert) {
    // Mock the service query method to return an empty array
    class EmptyMockService extends Service {
      async query() {
        return [];
      }
    }

    // Register and inject the empty mock service
    this.owner.register('service:store', EmptyMockService);

    await render(hbs`<MembersDataContainer as |members|>
      <ul>
        {{#each members as |member|}}
          <li>{{member.name}}</li>
        {{/each}}
      </ul>
    </MembersDataContainer>`);

    assert.dom('ul').exists();
    assert.dom('ul li').doesNotExist();
  });
});
