import { DataSource, MigrationExecutor } from "typeorm";

export async function migrate(database: DataSource, direction: "run" | "revert") {
  const runner = database.createQueryRunner();
  await runner.connect();
  try {
    await runner.startTransaction();
    try {
      // Serialize CLI runs and app replicas before TypeORM checks migration history.
      await runner.query("SELECT pg_advisory_xact_lock(hashtext(current_database()), hashtext('bookkeeper.migrations'))");
      const executor = new MigrationExecutor(database, runner);
      if (direction === "revert") {
        await executor.undoLastMigration();
      } else {
        await executor.executePendingMigrations();
      }
      await runner.commitTransaction();
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    }
  } finally {
    await runner.release();
  }
}
