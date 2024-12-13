import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  getOneUserController,
  updateUserController
} from "../../controllers/user/users.js";
import { authenticateLoginToken, authenticateUser } from "../../middleware/userAuthorization.js";
import { upload } from "../../helpers/pictureUpload.js";
const router = express.Router();
router.get("/users", authenticateLoginToken, getAllUsersController);
router.get("/users/:id", authenticateLoginToken, getOneUserController);
router.put("/users/:id", authenticateUser, upload.single("profilePicture"), updateUserController);
router.delete("/users/:id", authenticateLoginToken, deleteUserController);

export default router;
