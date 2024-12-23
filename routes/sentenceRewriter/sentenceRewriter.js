import express from "express";
import rewriteSentences from "../../controllers/sentenceRewriter/sentenceRewriter.js";

const router = express.Router();

router.post("/sentencerewriter", rewriteSentences);

export default router;
