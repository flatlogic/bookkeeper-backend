const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const useSsl = process.env.DB_SSL === "true";

module.exports = {
  "type": "postgres",
  "url": databaseUrl,
  "synchronize": true,
  "logging": true,
  "migrationsTableName": "_migrations",
  "entities": [
    "dist/models/**/*.js"
  ],
  "migrations": [
    "dist/migrations/**/*.js"
  ],
  "cli": {
    "migrationsDir": "src/migrations"
  },
  "ssl": useSsl ? { "rejectUnauthorized": false } : false,
  "extra": useSsl ? { "ssl": { "rejectUnauthorized": false } } : undefined
};
