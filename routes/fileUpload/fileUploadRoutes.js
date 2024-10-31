import express from "express";
import { upload } from "../../helpers/fileUpload.js";
import { readFile } from "../../controllers/fileUpload/fileUpload.js";

const router = express.Router();
router.post("/upload", upload.single("file"), readFile);

export default router;
