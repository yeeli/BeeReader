exports.up = function(knex, Promise) {
return knex.schema.createTable('accounts', function(table) {
  table.increments('id');
  table.string('username');
  table.integer('unread_count');
  table.integer('starred_count');
  table.integer('item_count');
})
.catch(function(e){
  console.error(e);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts')
};
