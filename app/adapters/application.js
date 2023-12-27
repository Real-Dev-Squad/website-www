import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { APPS } from 'website-www/constants/urls';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = APPS.API_BACKEND;

  headers = {
    'Content-Type': 'application/json',
  };

  ajaxOptions() {
    const options = super.ajaxOptions(...arguments);
    options.credentials = 'include';
    return options;
  }

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
