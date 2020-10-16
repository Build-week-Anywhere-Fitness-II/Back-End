require("dotenv").config();
const pgConnection = process.env.DATABASE_URL;

module.exports = {
    development: {
      client: 'sqlite3',
      connection: { filename: './database/auth.db3' },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './database/seeds' },
    },
  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: "./database/migrations",
    },
  },
    testing: {
      client: "sqlite3",
      connection: {
        filename: "./database/test.db3",
      },
      useNullAsDefault: true,
      migrations: {
        directory: "./database/migrations",
        tableName: 'dbmigrations'
      },
      seeds: { directory: './database/seeds'}
    },
  };