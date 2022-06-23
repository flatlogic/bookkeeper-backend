import { createConnection, EntitySchema, getManager, ObjectType, Repository } from "typeorm";

export const init = async () => {
  const host: string = process.env.PGHOST;
  const database: string = process.env.PGDATABASE;
  const username: string = process.env.PGUSER;
  const password: string = process.env.PGPASSWORD;
  const port: number = +process.env.PGPORT;

  try {
    return await createConnection({
      name: "bookkeeper_seed",
      type: "postgres",
      database,
      host,
      port,
      username,
      password,
      extra: { ssl: true, rejectUnauthorized: false },
      entities: [
        __dirname + "/../models/*"
      ],
      synchronize: true,
    });
  } catch (e) {
    console.error("DB connection issue: ", e);
  }
};

export const getRepository = async <Entity>(
  model: ObjectType<Entity> | EntitySchema<Entity> | string
): Promise<Repository<Entity>|null> => {
  return getManager().getRepository(model);
};
