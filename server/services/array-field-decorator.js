'use strict';

const decorator = (service) => ({
  async findMany(uid, params = {}) {
    const model = strapi.getModel(uid);
    const result = await service.findMany.call(this, uid, params);

    const { stringToArray } = await strapi.plugin('string-array').service('db-manager-services');

    await stringToArray(model, result);

    return result;
  },

  async create(uid, opts = {}) {
    const model = strapi.getModel(uid);
    const { arrayToString } = await strapi.plugin('string-array').service('db-manager-services');

    opts.data = arrayToString(opts.data, model);
    return await service.create.call(this, uid, opts);
  },

  async update(uid, entityId, opts = {}) {
    const model = strapi.getModel(uid);
    const { arrayToString } = await strapi.plugin('string-array').service('db-manager-services');

    opts.data = arrayToString(opts.data, model);
    return await service.update.call(this, uid, entityId, opts);
  }
});

module.exports = () => ({
  decorator
});
