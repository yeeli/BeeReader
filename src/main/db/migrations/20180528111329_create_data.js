exports.up = function(knex, Promise) {
   return knex.schema.createTable('datas', function(t) {
    t.increments();
    t.integer('entry_id').unsigned().notNullable();
    t.string('title');
    t.string('author');
    t.string('url');
    t.text('content');
    t.timestamp('created_at').defaultTo(Date.now());
    t.timestamp('updated_at').defaultTo(Date.now());
  
    t.foreign('entry_id').references('id').inTable('entries');
   }) 
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('datas')
};
