'use strict';

const decorator = (service) => ({
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
