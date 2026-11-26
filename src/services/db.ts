import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

const dataSource: DataSource = require("../../ormconfig");

export const init = () => dataSource.initialize();

export const getRepository = async <Entity extends ObjectLiteral>(model: EntityTarget<Entity>) =>
  dataSource.getRepository(model);
