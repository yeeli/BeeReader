exports.up = function(knex, Promise) {
   return knex.schema.createTable('categories_streams', function(t) {
      t.integer('categorie_id').notNullable();
      t.integer('stream_id').notNullable();
      t.foreign('categorie_id').references('id').inTable('categories');
      t.foreign('stream_id').references('id').inTable('streams');
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories_streams')
};
