import { body, param, query } from "express-validator";

export default {
  create: [
    query("fiscalYear", "\"fiscalYear\" cannot be empty").exists(),
    body("code", "\"code\" cannot be empty").exists(),
    body("description", "\"description\" cannot be empty").exists(),
    body("type", "\"type\" cannot be empty").exists(),
    body("status", "\"status\" cannot be empty").exists(),
  ],
  hasId: [
    param("id", "\"id\" must be a positive integer").isInt({min: 1, max: 2147483647}),
  ],
  list: [
    query("fiscalYear", "\"fiscalYear\" cannot be empty").exists(),
  ],
};
