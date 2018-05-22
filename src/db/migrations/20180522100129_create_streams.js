exports.up = function(knex, Promise) {
   return knex.schema.createTable('streams', function(t) {
    t.increments();
    t.string('oid');
    t.integer('categorie_id').unsigned().notNullable();
    t.integer('account_id').unsigned().notNullable();
    t.string('title');
    t.string('website');
     t.json('keywords');
    t.integer('unread_count');
    t.integer('starred_count');
    t.integer('entries_count');
    t.integer('sort');
    t.string('state');
    t.timestamps(['created_at', 'updated_at'], knex.fn.now());
  
    t.foreign('categorie_id').references('id').inTable('categories');
    t.foreign('account_id').references('id').inTable('accounts');
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('streams')
};
