import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | word-cloud', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('isWordCloud', true);

    await render(hbs`<WordCloud 
    @isWordCloud={{this.isWordCloud}}
    />`);

    assert.dom('[data-test-word-cloud]').exists();

    this.set('isWordCloud', false);

    assert.dom('[data-test-word-cloud]').doesNotExist();
  });
});
