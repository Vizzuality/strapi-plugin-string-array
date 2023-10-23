'use strict';

const decorator = (service) => ({
  async findMany(uid, params = {}) {
    const model = strapi.getModel(uid);
    const result = await service.findMany.call(this, uid, params);

    const { stringToArray } = await strapi.plugin('string-array').service('db-manager-services');

    await stringToArray(model, result);

    return result;
  }
});

module.exports = () => ({
  decorator
});
