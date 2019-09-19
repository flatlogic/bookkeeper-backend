import { body, param, query } from "express-validator";

export default {
  create: [
    body("code", "\"code\" cannot be empty").exists(),
    body("description", "\"description\" cannot be empty").exists(),
  ],
};
