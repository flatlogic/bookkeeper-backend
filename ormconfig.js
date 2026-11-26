require("dotenv").config();
const path = require("path");
const { DataSource } = require("typeorm");

const connection = process.env.NODE_ENV === "production"
  ? { url: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
  : {
      host: process.env.PGHOST || "localhost",
      port: Number(process.env.PGPORT || 5432),
      username: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "",
      database: process.env.PGDATABASE || "bookkeeper_seed",
    };

module.exports = new DataSource({
  type: "postgres",
  ...connection,
  synchronize: false,
  migrationsTableName: "_migrations",
  entities: [path.join(__dirname, "dist/models/**/*.js")],
  migrations: [path.join(__dirname, "dist/migrations/active/*.js")],
});
