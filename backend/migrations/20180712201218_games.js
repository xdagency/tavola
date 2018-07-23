
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('games', function (table) {
        table.increments('id').primary();
        table.integer('rank');
        table.text('bgg_link');
        table.integer('game_id').unique().notNullable();
        table.string('names').notNullable();
        table.integer('min_players');
        table.integer('max_players');
        table.integer('avg_time');
        table.integer('min_time');
        table.integer('max_time');
        table.integer('year');
        table.float('avg_rating');
        table.float('geek_rating');
        table.integer('num_votes');
        table.text('image_url');
        table.integer('age');
        table.text('mechanic');
        table.text('category');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('games') // drop table when reverting
};
