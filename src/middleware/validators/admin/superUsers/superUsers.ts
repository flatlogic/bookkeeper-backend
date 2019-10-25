import { body } from "express-validator";

export default {
  updateStatus: [
    body("status", "\"status\" invalid").exists().isIn([1, 0]),
  ],
};
