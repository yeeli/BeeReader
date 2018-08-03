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
     //t.boolean('unread').defaultTo(false);
     //t.boolean('starred').defaultTo(false);
    t.boolean('cached').defaultTo(false);
    t.datetime('published_at');
    t.datetime('starred_at');
    t.datetime('read_at');
    t.timestamp('created_at').defaultTo(Date.now());
    t.timestamp('updated_at').defaultTo(Date.now());
    t.string('state');
  
    t.foreign('stream_id').references('id').inTable('streams');
   }) 
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries')
};
