'use strict';

const _ = require('lodash');
const dbManagerService = require('./db-manager-services');
const arrayFieldDecorator = require('./array-field-decorator');

const separatorMap = {
  'comma': ',',
  'semicolon': ';',
  'pipe': '|',
}

const transform = async (fieldMap, strapi, ctx, next) => {
  await next();

  // ensure body exists, occurs on non existent route
  if (!ctx.body || !ctx.body.data) {
    return;
  }

  for (const [key, value] of Object.entries(fieldMap)) {
    switch (true) {
      case ctx.response.body.data instanceof Object:
        if (ctx.response.body.data.attributes[key]) {
          ctx.response.body.data.attributes[key] = ctx.response.body.data.attributes[key].split(separatorMap[value.options.separator || 'comma'] );
        }
        break;
      case ctx.response.body.data instanceof Array:
        ctx.response.body.data = ctx.response.body.data.map((item) => {
          if (item.attributes[key]) {
            item.attributes[key] = item.attributes[key].split(separatorMap[value.options.separator || 'comma'] );
          }
        })
        break;
      default:
        return;
    }
  }
};

module.exports = {
  'array-field-decorator': arrayFieldDecorator,
  'db-manager-services': dbManagerService,
  transform
};
