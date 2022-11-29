import JSONAPIAdapter from '@ember-data/adapter/json-api';

import ENV from 'website-www/config/environment';

console.log(ENV.BASE_API_URL);

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.BASE_API_URL;

  ajaxOptions() {
    const options = super.ajaxOptions(...arguments);
    options.credentials = 'include';
    return options;
  }

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
