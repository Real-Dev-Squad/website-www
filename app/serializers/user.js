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
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (requestType === 'queryRecord' && payload.username) {
      return {
        data: {
          id: payload.username,
          type: primaryModelClass.modelName,
          attributes: {
            username: payload.username,
          },
        },
      };
    } else {
      return super.normalizeResponse(
        store,
        primaryModelClass,
        payload,
        id,
        requestType,
      );
    }
  }
}
