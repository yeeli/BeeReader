const config = require('../config/database')
const path = require('path')

const database = config[process.env.NODE_ENV]
const migrationsPath = path.join(__dirname, "migrations")

const knex = require('knex')(database)

knex.migrate.latest({directory: migrationsPath})
.catch(function(e){
  console.error(e);
})
