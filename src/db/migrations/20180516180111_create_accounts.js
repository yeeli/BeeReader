exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', function(t) {
    t.increments();
    t.string('oid');
    t.string('service')
    t.string('username');
    t.integer('unread_count');
    t.integer('starred_count');
    t.integer('entries_count');
    t.integer('sort');
    t.datetime('last_synced_at');
    t.string('state');
    t.timestamps(['created_at', 'updated_at'], knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts')
};
