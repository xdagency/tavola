
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary();
        table.string('email').unique();
        table.string('password').notNullable();
        table.string('name');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
