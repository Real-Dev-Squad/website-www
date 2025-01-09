import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import sinon from 'sinon';
import ENV from 'website-www/config/environment.js';

module('Unit | Controller | profile', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    const controller = this.owner.lookup('controller:profile');
    controller.model = {
      first_name: 'Steve',
      last_name: 'Rogers',
      company: 'RDS',
      designation: 'developer',
      linkedin_id: '123_@steve',
      twitter_id: '123_@steve',
      website: 'website.com',
    };
  });

  test('it initializes formData and fields correctly', function (assert) {
    const controller = this.owner.lookup('controller:profile');

    assert.ok(controller.formData, 'formData is initialized');
    assert.strictEqual(
      controller.formData.first_name,
      'Steve',
      'formData first_name is set correctly',
    );
    assert.ok(controller.fields.length > 0, 'Fields are initialized with data');
  });

  test('it checks if handleFieldChange updates formData and sets isSubmitDisabled', function (assert) {
    const controller = this.owner.lookup('controller:profile');

    controller.isSubmitDisabled = 'true';

    controller.handleFieldChange('first_name', 'John');

    assert.strictEqual(
      controller.formData.first_name,
      'John',
      'Form Data is updated correctly',
    );
    assert.notOk(
      controller.isSubmitDisabled,
      'isSubmitDisabled is updated correctly',
    );
  });

  test('handleFieldValidation updates field error state', function (assert) {
    const controller = this.owner.lookup('controller:profile');

    controller.handleFieldValidation('first_name', false);
    const field = controller.fields.find((f) => f.id === 'first_name');
    assert.ok(field.showError, 'Field error state is set to true');

    controller.handleFieldValidation('first_name', true);
    assert.notOk(field.showError, 'Field error state is set to false');
  });

  test('removeEmptyFields cleans formData correctly', function (assert) {
    const controller = this.owner.lookup('controller:profile');

    controller.formData = {
      first_name: 'John',
      last_name: '',
      company: 'RDS',
    };

    const cleanedData = controller.removeEmptyFields(controller.formData);
    const requiredData = {
      first_name: 'John',
      company: 'RDS',
    };
    assert.deepEqual(cleanedData, requiredData, 'Empty fields are removed');
  });

  test('handleSubmit sends correct API request and handles response', async function (assert) {
    const controller = this.owner.lookup('controller:profile');

    controller.formData = {
      first_name: 'John',
      last_name: 'Clark',
      company: 'RDS',
    };

    const userId = 'stYhhjzmiD9ZLS91xw01';
    controller.userId = userId;

    const fetchStub = sinon.stub(window, 'fetch');
    fetchStub.resolves(new Response(null, { status: 204 }));

    const toastStub = sinon.stub(controller.toast, 'success');

    await controller.handleSubmit({ preventDefault: () => {} });

    assert.ok(
      fetchStub.calledWithMatch(
        `${ENV.BASE_API_URL}/users/${userId}?profile=true&dev=true`,
        {
          method: 'PATCH',
          body: JSON.stringify(controller.formData),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        },
      ),
      'API request is sent correctly',
    );

    assert.ok(
      toastStub.calledWith('Updated details successfully'),
      'Success toast is displayed',
    );

    fetchStub.restore();
    toastStub.restore();
  });

  test('handleShowEditProfilePictureModal and closeModal update modal state', function (assert) {
    const controller = this.owner.lookup('controller:profile');

    controller.handleShowEditProfilePictureModal();
    assert.ok(controller.showEditProfilePictureModal, 'Modal is shown');

    controller.closeModal();
    assert.notOk(controller.showEditProfilePictureModal, 'Modal is hidden');
  });
});
