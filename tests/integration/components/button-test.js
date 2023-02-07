import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | button', function (hooks) {
  setupRenderingTest(hooks);

  test('button renders', async function (assert) {
    assert.expect(6);

    this.set('text', 'Next');
    this.set('variant', 'dark');
    this.set('click', () => {
      console.log('Button Clicks');
    });
    this.set('test', 'testing');

    await render(hbs`
    <Reusables::Button 
      @variant={{this.variant}}
      @text={{this.text}}
      @onClick={{this.click}}
      @test={{this.test}}
    />`);

    assert.dom('[data-test-button]').hasText('Next');
    assert.dom('[data-test-button]').hasClass('btn');
    assert.dom('[data-test-button]').hasClass('btn-dark');

    this.set('text', 'Previous');
    this.set('variant', 'light');

    assert.dom('[data-test-button]').hasText('Previous');
    assert.dom('[data-test-button]').hasClass('btn');
    assert.dom('[data-test-button]').hasClass('btn-light');
  });
});
