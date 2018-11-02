exports.up = function(knex, Promise) {
  return knex.schema.createTable('folders', function(t) {
    t.increments();
    t.integer('account_id').unsigned().notNullable();
    t.string('source_type');
    t.integer('source_id');
    t.datetime('deleted_at');
    t.timestamp('created_at').defaultTo(Date.now());
    t.timestamp('updated_at').defaultTo(Date.now());
    t.string('state');
  })
  
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('folders')
};
