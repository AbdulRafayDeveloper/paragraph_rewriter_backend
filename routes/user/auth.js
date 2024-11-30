import express from "express";
import { registerUser, loginUser, changePassword } from "../../controllers/user/auth.js";
import validateUser from "../../middleware/userValidation.js";
import { authenticatechangePassword } from "../../middleware/userAuthorization.js";
const router = express.Router();
router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/changepassword", authenticatechangePassword, changePassword);

export default router;
