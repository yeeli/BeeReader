const path = require('path')
const migrationsPath = path.join(__dirname, "migrations")

const makeMigrate = () => {
  const config = require('../config/database')
  const database = config[process.env.NODE_ENV]
  const knex = require('knex')(database)
  knex.migrate
  .latest({directory: migrationsPath})
  .then(function(){
    if (process.env.NODE_ENV === 'development' && process.env.NODE_FROM === 'console') {
      process.exit(0)
    }
  }).catch(function(e){
    console.log(e);
  });
}

module.exports = makeMigrate()

