exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', function(t) {
    t.increments();
    t.string('oid');
    t.string('service')
    t.string('title')
    t.string('username');
    t.integer('unread_count').defaultTo(0);
    t.integer('starred_count').defaultTo(0);
    t.integer('entries_count').defaultTo(0);
    t.integer('sort');
    t.datetime('last_synced_at');
    t.string('state');
    t.timestamp('created_at').defaultTo(Date.now());
    t.timestamp('updated_at').defaultTo(Date.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts')
};
