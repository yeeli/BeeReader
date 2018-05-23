'use strict'
  /*
const config = require('../config/database')
const database = config[process.env.NODE_ENV]
const knex = require('knex')(database)
const schema = require('../db/schema')

// Start migrations
schema(knex)
*/

const model = require('./model')

console.log(model.account.all())

module.experts = {
}
