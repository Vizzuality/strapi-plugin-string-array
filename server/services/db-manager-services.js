'use strict';

const _ = require("lodash");

const separatorMap = {
  'comma': ',',
  'semicolon': ';',
  'pipe': '|',
}

module.exports = ({ strapi }) => {
  const stringToArray = async function (model, results) {
    let convertFields = []
    Object.keys(model.attributes).forEach(attr => {
      if (model.attributes[attr].customField === 'plugin::string-array.input') {
        convertFields.push(attr)
      }
    });

    if (convertFields.length > 0) {
      results.map(result => {
        convertFields.map(field => {
          const separatorName = model.attributes[field].options?.separator || 'comma'
          if (typeof result[field] === 'string' || result[field] instanceof String) {
            result[field] = _.map(result[field].split(separatorMap[separatorName] || ','), _.trim)
          }
        })
      });
    }
    return results;
  }

  return {
    stringToArray
  }
};
