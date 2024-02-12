'use strict';

const _ = require('lodash');

const separatorMap = require('../separator-map');

const transformGetSingle = async (fieldMap, strapi, ctx, next) => {
  await next();

  if (!ctx.body || !ctx.body.data) {
    return;
  }

  for (const [key, value] of Object.entries(fieldMap)) {
    if (ctx.response.body.data.attributes[key]) {
      ctx.response.body.data.attributes[key] = ctx.response.body.data.attributes[key].split(separatorMap[value.options.separator || 'comma']);
    }
  }
};

const transformGetArray = async (fieldMap, strapi, ctx, next) => {
  await next();

  // ensure body exists, occurs on non existent route
  if (!ctx.body || !ctx.body.data) {
    return;
  }

  for (const [key, value] of Object.entries(fieldMap)) {
    ctx.response.body.data = ctx.response.body.data.map((item) => {
      if (key in item.attributes) {
        item.attributes[key] = item.attributes[key].split(separatorMap[value.options.separator || 'comma']);
      }
      return item;
    })
  }
};

module.exports = { transformGetSingle, transformGetArray };
