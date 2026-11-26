import { init } from "./services/db";
import { migrate } from "./services/migrations";

async function main() {
  const direction = process.argv[2];
  if (direction !== "run" && direction !== "revert") {
    throw new Error("Expected a migration direction of run or revert");
  }
  const database = await init();
  try {
    await migrate(database, direction);
  } finally {
    await database.destroy();
  }
}

main().catch(error => {
  console.error("Database migration failed", error);
  process.exitCode = 1;
});
