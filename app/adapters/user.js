import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    if (query.role) {
      return `${super.urlForQuery(...arguments)}/search`;
    }
    return super.urlForQuery(...arguments);
  }
}
