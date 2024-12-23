import express from "express";
import { registerUser, loginUser, changePassword, forgetPassword } from "../../controllers/user/auth.js";
import validateUser from "../../middleware/userValidation.js";
import { authenticateUser } from "../../middleware/userAuthorization.js";
const router = express.Router();
router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/changepassword", authenticateUser, changePassword);
router.post("/forgetpassword", forgetPassword);

export default router;
