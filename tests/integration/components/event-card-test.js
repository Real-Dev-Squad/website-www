import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { EVENTS_PAGE_MAPPING } from '../../constants/events-data';

module('Integration | Component | event-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(12);

    this.set('event', EVENTS_PAGE_MAPPING[0]);

    await render(hbs`
    <EventCard 
    @title={{this.event.title}}
    @description={{this.event.description}}
    @eventLink={{this.event.eventLink}}
    @timing={{this.event.timing}}
    @speakers={{this.event.speakers}}
    />`);

    assert.dom('[data-test-event-card]').exists();

    assert.dom('[data-test-event-card-title]').exists();
    assert.dom('[data-test-event-card-title]').hasText(this.event.title);

    assert.dom('[data-test-event-card-description]').exists();
    assert
      .dom('[data-test-event-card-description]')
      .hasText(this.event.description);

    assert.dom('[data-test-event-card-timing]').hasText(this.event.timing);

    assert.dom('[data-test-event-card="speaker-name"]').exists();
    assert.dom('[data-test-event-card="linkedin-logo"]').exists();
    assert.dom('[data-test-event-card="speaker-info"]').exists();
    assert.dom('[data-test-event-card="highlights"]').exists();
    assert.dom('[data-test-event-card="cta-button-container"]').exists();
    assert.dom('[data-test-event-card="button"]').exists();
  });
});
