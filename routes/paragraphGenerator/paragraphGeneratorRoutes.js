import express from "express";
import generateParagraphs from "../../controllers/paragraphGenerator/paragraphGenerator.js";

const router = express.Router();

router.post("/paragraphgeneration", generateParagraphs);

export default router;