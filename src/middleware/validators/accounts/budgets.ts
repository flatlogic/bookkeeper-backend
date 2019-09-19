import { body } from "express-validator";

export default {
  spreadBudget: [
    body("budget", "\"budget\" cannot be empty").exists(),
  ],
};
