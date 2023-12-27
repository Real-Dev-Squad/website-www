import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | event-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<EventCard />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <EventCard>
        template block text
      </EventCard>
    `);

    assert.dom().hasText('template block text');
  });
});
