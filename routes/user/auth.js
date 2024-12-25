import express from "express";
import { registerUser, loginUser, changePassword, forgetPassword, verifyOtp, resetPassword } from "../../controllers/user/auth.js";
import validateUser from "../../middleware/userValidation.js";
import { authenticateUser, authenticateOtpToken, authenticateEmailToken } from "../../middleware/userAuthorization.js";
const router = express.Router();
router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/changepassword", authenticateUser, changePassword);
router.post("/forgetpassword", forgetPassword);
router.post("/verifyotp",authenticateOtpToken ,verifyOtp);
router.post("/resetpassword", authenticateEmailToken, resetPassword);

export default router;
