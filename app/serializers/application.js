import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class ApplicationSerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    picture: { embedded: 'always' },
  };
}
