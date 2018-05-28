exports.up = function(knex, Promise) {
   return knex.schema.createTable('entries', function(t) {
    t.increments();
    t.string('oid');
    t.integer('stream_id').unsigned().notNullable();
    t.integer('account_id').unsigned().notNullable();
    t.string('title');
    t.text('summary');
    t.jsonb('keywords', '[]');
    t.jsonb('cover', '{}');
    t.boolean('unread').defaultTo(false);
    t.boolean('starred').defaultTo(false);
    t.boolean('cached').defaultTo(false);
    t.datetime('published');
    t.datetime('starred_at');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  
    t.foreign('stream_id').references('id').inTable('streams');
   }) 
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries')
};
