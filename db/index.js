const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile.js')['development'];

// Configuring Knex for SQLite3
const knex = Knex(knexConfig);

// Bind all Models to Knex instance
Model.knex(knex);

module.exports = { 
  Model,
  knex
};
