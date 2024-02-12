'use strict';

const _ = require('lodash');
const { getPluginService } = require('../util/getPluginService');

const transform = async (strapi, ctx, next) => {
  await next();

  // ensure body exists, occurs on non existent route
  if (!ctx.body) {
    return;
  }

  // ensure no error returned.
  if (!ctx.body.data) {
    return;
  }
};

module.exports = { transform };
