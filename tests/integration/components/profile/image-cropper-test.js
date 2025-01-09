import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | image-cropper', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.imageUrl = '/assets/images/dummyProfilePicture.png';

    this.setImageCoordinates = sinon.spy();
  });

  test('it renders the image with correct attributes', async function (assert) {
    await render(hbs`
      <Profile::ImageCropper
        @image={{this.imageUrl}}
        @setImageCoordinates={{this.setImageCoordinates}}
      />
    `);

    const image = this.element.querySelector('#image-cropper');
    const expectedFullUrl = `${window.location.origin}${this.imageUrl}`;

    assert.ok(image, 'Image element exists');
    assert.strictEqual(image.src, expectedFullUrl, 'Image has correct src');
    assert.strictEqual(image.id, 'image-cropper', 'Image has correct id');
    assert.strictEqual(image.alt, 'Cropper', 'Image has correct alt text');
  });
});
