import express from "express";
import {
  getAllUsersController,
  getOneUserController,
} from "../../controllers/user/users.js";
import { authenticateLoginToken } from "../../middleware/userAuthorization.js";
const router = express.Router();
router.get("/users", authenticateLoginToken, getAllUsersController);
router.get("/users/:id", authenticateLoginToken, getOneUserController);

export default router;
