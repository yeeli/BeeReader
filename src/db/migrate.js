const path = require('path')
const migrationsPath = path.join(__dirname, "migrations")
const config = require('../config/database')
const database = config[process.env.NODE_ENV]
const knex = require('knex')(database)

function makeMigrate() {
  knex.migrate
  .latest({directory: migrationsPath})
  .then(function(){
    process.exit(0)
  }).catch(function(e){
    console.log(e);
  });
}

makeMigrate()

