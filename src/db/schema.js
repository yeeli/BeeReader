const path = require('path')
const migrationsPath = path.join(__dirname, "migrations")

module.exports = function(knex) {
  knex.migrate.latest({directory: migrationsPath})
    .catch(function(e){
      console.error(e);
    });
}
