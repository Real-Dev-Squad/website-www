import Transform from '@ember-data/serializer/transform';

export default class JsonTransform extends Transform {
  deserialize(serialized) {
    return JSON.stringify(serialized);
  }

  serialize(deserialized) {
    return JSON.parse(deserialized);
  }
}
