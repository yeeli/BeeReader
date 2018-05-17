exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', function(t) {
    t.increments();
    t.string('oid');
    t.string('service_id')
    t.string('username');
    t.integer('unread_count');
    t.integer('starred_count');
    t.integer('items_count');
    t.integer('sort');
    t.datetime('last_synced_at');
    t.timestamp('created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts')
};
