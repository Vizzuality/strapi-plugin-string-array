const _ = require('lodash');
const { transform } = require('./middlewares/index');

module.exports = ({ strapi }) => {
  const modelList = [];
  _.forEach(Object.keys(strapi.api), (apiName) => {
    _.forEach(strapi.api[apiName].contentTypes, (contentType) => {
      const fieldMap = {};
      for (const [key, value] of Object.entries(contentType.attributes)) {
        if (value.customField === 'plugin::string-array.input') {
          fieldMap[key] = value;
        }
      }

      if (Object.keys(fieldMap).length > 0) {
        strapi.api[apiName].routes[apiName].routes.filter(route => route.method === 'GET').forEach(route => {
          if (!_.has(route, ['config', 'middlewares'])) {
            _.set(route, ['config', 'middlewares'], []);
          }
          route.config.middlewares.push((ctx, next) => transform(fieldMap, strapi, ctx, next));
        })
      }
    });
  });

  strapi.customFields.register({
    name: 'input',
    plugin: 'string-array',
    type: 'text',
  });
};
