'use strict';

const _ = require('lodash');
const { transformGetArray, transformGetSingle } = require('./middlewares/transform');

module.exports = ({ strapi }) => {
  const modelList = [];
  _.forEach(Object.keys(strapi.api), (apiName) => {
    _.forEach(strapi.api[apiName].contentTypes, (contentType) => {
      const fieldMap = {};
      const contentTypeKind = contentType.kind;
      for (const [key, value] of Object.entries(contentType.attributes)) {
        if (value.customField === 'plugin::string-array.input') {
          fieldMap[key] = value;
        }
      }

      if (Object.keys(fieldMap).length > 0) {
        if (!_.has(strapi.api[apiName], ['routes', apiName, 'routes']) || _.isEmpty(strapi.api[apiName].routes[apiName].routes)) {
          return;
        }
        strapi.api[apiName].routes[apiName].routes.filter(route => route.method === 'GET').forEach(route => {
          if (!_.has(route, ['config', 'middlewares'])) {
            _.set(route, ['config', 'middlewares'], []);
          }

          if (route.path.endsWith('/:id') || contentTypeKind === 'singleType') {
            route.config.middlewares.push((ctx, next) => transformGetSingle(fieldMap, strapi, ctx, next));
          } else {
            route.config.middlewares.push((ctx, next) => transformGetArray(fieldMap, strapi, ctx, next));

          }
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
