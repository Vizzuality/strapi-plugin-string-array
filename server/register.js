'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'input',
    type: 'text',
  });
};
