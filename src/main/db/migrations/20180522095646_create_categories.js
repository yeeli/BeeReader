exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function(t) {
    t.increments();
    t.string('oid');
    t.integer('account_id').unsigned().notNullable();
    t.string('title');
    t.integer('sort');
    t.string('state');
    t.timestamp('created_at').defaultTo(Date.now());
    t.timestamp('updated_at').defaultTo(Date.now());


    t.foreign('account_id').references('id').inTable('accounts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')
};
