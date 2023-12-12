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
      console.log('query 22', query);
      return `${super.urlForQueryRecord(...arguments)}/username`;
    }
    return super.urlForQueryRecord(...arguments);
  }
}
