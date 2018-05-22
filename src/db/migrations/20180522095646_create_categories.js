exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function(t) {
    t.increments();
    t.string('oid');
    t.integer('account_id').unsigned().notNullable();
    t.string('title');
    t.string('html');
    t.string('url');
    t.integer('unread_count');
    t.integer('starred_count');
    t.integer('entries_count');
    t.integer('streams_count');
    t.integer('sort');
    t.string('state');
    t.timestamps(['created_at', 'updated_at'], knex.fn.now());


    t.foreign('account_id').references('id').inTable('accounts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')
};
