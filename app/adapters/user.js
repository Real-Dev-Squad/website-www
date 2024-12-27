import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    if (query.role) {
      return `${super.urlForQuery(...arguments)}/search`;
    }
    return super.urlForQuery(...arguments);
  }

  urlForQueryRecord(query) {
    if (query.firstname && query.lastname) {
      return `${super.urlForQueryRecord(...arguments)}/username`;
    }
    return super.urlForQueryRecord(...arguments);
  }

  urlForUpdateRecord() {
    return `${this.host}/users?profile=true`;
  }
}
