import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  normalizeArrayResponse(store, primaryModelClass, payload) {
    if ('error' in payload) {
      const error = {
        status: payload.statusCode,
        title: payload.error,
        details: payload.message,
      };
      return { error };
    }
    const data = payload.users.map((user) => {
      const { id, ...other } = user;
      return {
        id,
        type: primaryModelClass.modelName,
        attributes: other,
      };
    });
    const links = { ...payload.links, first: null, last: null };
    return { data, links };
  }
}
