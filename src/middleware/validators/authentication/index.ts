import { body, query } from "express-validator";

export default {
  login: [
    body("username", "\"username\" cannot be empty").exists(),
    body("password", "\"password\" cannot be empty").exists(),
  ],
  setPassword: [
    body("token", "\"token\" cannot be empty").exists(),
    body("password", "\"password\" cannot be empty").exists(),
    body("repeatPassword", "\"repeatPassword\" cannot be empty").exists(),
  ],
  resetPassword: [
    body("username", "\"username\" cannot be empty").exists(),
  ],
};
