
exports.up = function(knex, Promise) {
    return knex.schema.table('users_to_games', function (table) {
        table.integer('user_id').references('id').inTable('users');
        table.integer('game_id').references('id').inTable('games');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users_to_games', function (table) {
        table.dropColumn('user_id');
        table.dropColumn('game_id');
    });
};
