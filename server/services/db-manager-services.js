'use strict';

const _ = require("lodash");

const separatorMap = require('./../separator-map');

module.exports = ({ strapi }) => {
  const arrayToString = function(data, model) {
    let updateFields = []
    Object.keys(model.attributes).forEach(attr => {
      if (model.attributes[attr].customField === 'plugin::string-array.input') {
        if (data[attr] instanceof Array) {
          const separator = separatorMap[model.attributes[attr].options?.separator || 'comma']
          data[attr] = data[attr].join(separator)
        }
      }
    });
    return data
  }

  return {
    arrayToString,
  }
};
