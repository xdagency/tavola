// Update with your config settings.

module.exports = {

    client: 'postgres',
    connection: process.env.DATABASE_URL || {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : 'postgres',
        database : 'boardgamegen',
        charset  : 'utf8'
    },
  
    development: {
      client: 'postgres',
    },
    
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: __dirname + 'migrations'
      }
    }
  
  };
  