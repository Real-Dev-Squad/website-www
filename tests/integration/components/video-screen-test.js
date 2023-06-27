import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | video-screen', function (hooks) {
  setupRenderingTest(hooks);

  test('video screen renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<VideoScreen />`);

    assert.dom('[data-test-video]').exists();
  });

  test('checking props value', async function (assert) {
    assert.expect(1);

    this.set('src', '/assets/starting-soon.mp4');

    await render(hbs`
      <VideoScreen @src={{this.src}}/>
    `);

    assert.strictEqual(
      document.querySelector('.video-screen').getAttribute('src'),
      this.src,
      'src is equal!'
    );
  });
});
