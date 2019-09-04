'use strict';

const { Model } = require('../db');

class URL extends Model {
  static get tableName(){
    return 'urls';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['url','short_url'],

      properties: {
        url: { type: 'string' },
        short_url: { type: 'string', minLength: 5, maxLength: 5 }
      }
    };
  }
}

module.exports = URL;