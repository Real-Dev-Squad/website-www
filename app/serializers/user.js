import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  normalizeArrayResponse(store, primaryModelClass, payload) {
    if ('error' in payload) {
      const error = {
        status: payload.statusCode,
        title: payload.error,
        details: payload.message,
      };
      console.log('error', error);
      return { error };
    }

    const data = payload.users.map((user) => {
      const { id, ...other } = user;
      console.log('data', data);
      return {
        id,
        type: primaryModelClass.modelName,
        attributes: other,
      };
    });
    const links = { ...payload.links, first: null, last: null };
    return { data, links };
  }
  normalizeResponse(store, primaryModelClass, payload, requestType) {
    if (requestType === 'queryRecord') {
      const normalizePayload = {
        user: {
          username: payload.username,
        },
      };
      console.log('payloaddd', payload);

      return super.normalizeResponse(
        store,
        primaryModelClass,
        normalizePayload,
        requestType,
      );
    } else {
      return super.normalizeArrayResponse(payload);
    }
  }
}
