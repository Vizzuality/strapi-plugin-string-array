'use strict';

const _ = require("lodash");

const separatorMap = {
  'comma': ',',
  'semicolon': ';',
  'pipe': '|',
}

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

  const stringToArrayInSingleResult = async function (model, result) {
    return (await stringToArrayInResultArray(model, [result]))[0]
  }

  const stringToArrayInResultArray = async function (model, results) {
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
    arrayToString,
    stringToArrayInResultArray,
    stringToArrayInSingleResult
  }
};
