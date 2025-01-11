import Controller from '@ember/controller';
import ENV from 'website-www/config/environment.js';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { toastNotificationTimeoutOptions } from '../constants/toast-notification';

const BASE_URL = ENV.BASE_API_URL;

export default class ProfileController extends Controller {
  @service toast;
  @service router;
  get isDev() {
    if (
      this.router.currentRoute &&
      this.router.currentRoute.queryParams.dev === 'true'
    ) {
      return this.router.currentRoute.queryParams.dev;
    }
    return false;
  }
  get imageUploadUrl() {
    return `${BASE_URL}/users/picture`;
  }
  @tracked formDataKeyName = 'profile';
  @tracked showEditProfilePictureModal = false;
  @tracked title = 'Profile Details';
  @tracked isSubmitDisabled = true;
  @tracked userId = this.model.id || '';
  @tracked formData = {
    first_name: this.model.first_name,
    last_name: this.model.last_name,
    company: this.model.company,
    designation: this.model.designation,
    linkedin_id: this.model.linkedin_id,
    twitter_id: this.model.twitter_id,
    website: this.model.website,
  };

  @tracked fields = [
    {
      id: 'first_name',
      label: 'First Name*',
      type: 'text',
      required: true,
      placeholder: 'First Name',
      icon_url: '/assets/icons/user.svg',
      showError: false,
      errorMessage: 'First name is required',
    },
    {
      id: 'last_name',
      label: 'Last Name*',
      type: 'text',
      required: true,
      placeholder: 'Last Name',
      icon_url: '/assets/icons/user.svg',
      showError: false,
      errorMessage: 'Last name is required',
    },
    {
      id: 'company',
      label: 'Company or College name*',
      type: 'text',
      required: true,
      placeholder: 'e.g Google or Dr. Kalam University',
      icon_url: '/assets/icons/company.svg',
      showError: false,
      errorMessage: 'Company name is required',
    },
    {
      id: 'designation',
      label: 'Designation*',
      type: 'text',
      required: true,
      placeholder: 'e.g SDE - 2 or 3rd Year CSE Student',
      icon_url: '/assets/icons/user.svg',
      showError: false,
      errorMessage: 'Designation is required',
    },
    {
      id: 'linkedin_id',
      label: 'LinkedIn ID*',
      type: 'text',
      required: true,
      placeholder: 'e.g johndoe',
      icon_url: '/assets/icons/linkedin.svg',
      showError: false,
      errorMessage: 'Linkedin handle is required',
    },
    {
      id: 'twitter_id',
      label: 'Twitter Username*',
      type: 'text',
      required: true,
      placeholder: 'e.g johndoe',
      icon_url: '/assets/icons/twitter.svg',
      showError: false,
      errorMessage: 'Twitter handle is required',
    },
    {
      id: 'website',
      label: 'Personal Website',
      type: 'text',
      required: false,
      placeholder: 'e.g mysite.com',
      icon_url: '/assets/icons/website.svg',
      showError: false,
      errorMessage: '',
    },
  ];

  @action handleFieldChange(name, value) {
    set(this.formData, name, value);

    const anyErrors = this.fields.map((field) => {
      let hasError = false;

      if (field.required && this.formData[field.id] === '') {
        hasError = true;
      }
      return hasError;
    });
    this.isSubmitDisabled = anyErrors.filter(Boolean).length;
  }

  @action handleFieldValidation(id, isValid) {
    const index = this.fields.findIndex((field) => field.id === id);
    if (isValid) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
  }

  removeEmptyFields(reqObject) {
    const objectRequested = reqObject;
    for (const field in objectRequested) {
      if (!objectRequested[field]) {
        delete objectRequested[field];
      } else if (field === 'yoe') {
        objectRequested[field] = parseInt(objectRequested[field]);
      }
    }
    return objectRequested;
  }

  @action async handleSubmit(e) {
    e.preventDefault();
    const cleanReqObject = this.removeEmptyFields(this.formData);
    try {
      const response = await fetch(
        `${BASE_URL}/users/${this.userId}?profile=true&dev=true`,
        {
          method: 'PATCH',
          body: JSON.stringify(cleanReqObject),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      const { status } = response;
      if (status === 204) {
        this.toast.success('Updated details successfully', '', {
          ...toastNotificationTimeoutOptions,
          timeOut: '1000',
        });
      } else if (status !== 204) {
        this.toast.error(
          'Something went wrong. Please check console errors.',
          '',
          toastNotificationTimeoutOptions,
        );
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  }

  @action handleShowEditProfilePictureModal() {
    this.showEditProfilePictureModal = true;
  }
  @action closeModal() {
    this.showEditProfilePictureModal = false;
  }

  @action refreshRoute() {
    this.send('refreshModel');
  }
}
