import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { EVENTS_LOGS_DATA } from '../../../constants/event-logs-data';

module('Integration | Component | events/logs-page-main', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render Events::LogsPageMain', async function (assert) {
    await render(hbs`
      <Events::LogsPageMain />
    `);

    assert.dom('[data-test-logs-page-container]').exists();
    assert.dom('[data-test-logs-heading]').exists();
    assert.dom('[data-test-logs-main]').exists();
  });

  test('it should show loader if isLoading is true otherwise false', async function (assert) {
    await render(hbs`
      <Events::LogsPageMain
      @isLogsLoading={{true}}
      />
    `);

    assert.dom('[data-test-logs-loader]').exists();

    await render(hbs`
    <Events::LogsPageMain
    @isLogsLoading={{false}}
    />
  `);

    assert.dom('[data-test-logs-loader]').doesNotExist();
  });

  test('it should show fallback if isNoLogsPresent is true otherwise false', async function (assert) {
    await render(hbs`
      <Events::LogsPageMain
      @isNoLogsPresent={{true}}
      />
    `);

    assert.dom('[data-test-logs-fallback]').exists();

    await render(hbs`
    <Events::LogsPageMain
    @isNoLogsPresent={{false}}
    />
  `);

    assert.dom('[data-test-logs-fallback]').doesNotExist();
  });

  test('it should show logs if data is present', async function (assert) {
    this.set('logsData', EVENTS_LOGS_DATA);
    await render(hbs`
      <Events::LogsPageMain
      @isLogsLoading={{false}}
      @isNoLogsPresent={{false}}
      @eventLogsData={{this.logsData}}
      />
    `);

    EVENTS_LOGS_DATA.forEach((log) => {
      assert.dom(`[data-test-log-card="${log.timestampInSeconds}"]`).exists();
      assert
        .dom(`[data-test-log-card-time="${log.timestampInSeconds}"]`)
        .exists();
      assert
        .dom(`[data-test-log-card-text="${log.timestampInSeconds}"]`)
        .exists();
      assert
        .dom(`[data-test-log-card-removed-peer="${log.timestampInSeconds}"]`)
        .exists();
      assert
        .dom(`[data-test-log-removed-by="${log.timestampInSeconds}"]`)
        .exists();
    });
  });
});
