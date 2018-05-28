exports.up = function(knex, Promise) {
   return knex.schema.createTable('streams', function(t) {
    t.increments();
    t.string('oid');
    t.integer('account_id').unsigned().notNullable();
    t.string('title');
    t.string('website');
    t.jsonb('keywords');
    t.integer('unread_count').defaultTo(0);
    t.integer('starred_count').defaultTo(0);
    t.integer('entries_count').defaultTo(0);
    t.integer('sort');
    t.string('state');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());

    t.foreign('account_id').references('id').inTable('accounts');
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('streams')
};
