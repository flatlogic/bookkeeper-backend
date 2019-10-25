import { body, query } from "express-validator";

export default {
  login: [
    body("username", "\"username\" cannot be empty").exists(),
    body("password", "\"password\" cannot be empty").exists(),
  ],
  setPassword: [
    query("token", "\"token\" cannot be empty").exists(),
  ],
};
