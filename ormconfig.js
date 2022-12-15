let options;

if (process.env.NODE_ENV === 'production') {
  options = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "logging": true,
    "migrationsTableName": "_migrations",
    "entities": [
      "dist/models/**/*.{ts,js}"
    ],
    "ssl": true,
    "extra": {
      "ssl": {
        "rejectUnauthorized": false,
        "requestCert": true
      }
    },
    "migrations": [
      "src/migrations/**/*.{ts,js}"
    ],
    "cli": {
      "migrationsDir": "src/migrations"
    }
  }
} else {
  options = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "",
    "database": "bookkeeper_seed",
    "synchronize": true,
    "logging": true,
    "migrationsTableName": "_migrations",
    "entities": [
      "dist/models/**/*.{ts,js}"
    ],
    "migrations": [
      "src/migrations/**/*.{ts,js}"
    ],
    "cli": {
      "migrationsDir": "src/migrations"
    }
  }
}

module.exports = options;

