import express from "express";
import {
  createContactController
} from "../../controllers/user/contactUs.js";
import { authenticateLoginToken } from "../../middleware/userAuthorization.js";
const router = express.Router();
router.post("/contactus", createContactController);

export default router;
