
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users_to_games', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_to_games');
};