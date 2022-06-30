import { createConnection, EntitySchema, getManager, ObjectType, Repository } from "typeorm";

export const init = () => {
    return createConnection();
};

export const getRepository = async <Entity>(
  model: ObjectType<Entity> | EntitySchema<Entity> | string
): Promise<Repository<Entity>|null> => {
  return getManager().getRepository(model);
};
