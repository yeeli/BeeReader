exports.up = function(knex, Promise) {
   return knex.schema.createTable('entries', function(t) {
    t.increments();
    t.string('oid');
    t.integer('stream_id').unsigned().notNullable();
    t.integer('account_id').unsigned().notNullable();
    t.string('title');
    t.text('summary');
    t.enum('keywords', []);
    t.jsonb('cover');
    t.boolean('unread', false);
    t.boolean('starred', false);
    t.boolean('cached', false);
    t.datetime('published');
    t.datetime('starred_at');
    t.timestamps(['created_at', 'updated_at'], knex.fn.now());
  
    t.foreign('stream_id').references('id').inTable('streams');
   }) 
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries')
};
