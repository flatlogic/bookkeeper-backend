import { body, param, query } from "express-validator";

export default {
  create: [
    body("code", "\"code\" cannot be empty").exists(),
    body("description", "\"description\" cannot be empty").exists(),
    body("fiscalYear", "\"fiscalYear\" cannot be empty").exists(),
    body("type", "\"type\" cannot be empty").exists(),
    body("status", "\"status\" cannot be empty").exists(),
  ],
  hasId: [
    param("id", "\"id\" cannot be empty").exists(),
  ],
  list: [
    query("fiscalYear", "\"fiscalYear\" cannot be empty").exists(),
  ],
};
