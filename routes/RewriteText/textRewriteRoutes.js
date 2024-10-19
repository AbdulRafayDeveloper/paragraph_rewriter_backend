import express from 'express';
import {
     normalTextRewrite,
    fluentTextRewrite,
    formalTextRewrite,
    innovativeTextRewrite,
    coherentTextRewrite,
    academicTextRewrite
 } from '../../controllers/RewriteText/textRewrite.js';

const router = express.Router();

router.post('/normal', normalTextRewrite);
router.post('/fluent', fluentTextRewrite);
router.post('/formal', formalTextRewrite);
router.post('/innovative', innovativeTextRewrite);
router.post('/coherent', coherentTextRewrite);
router.post('/academic', academicTextRewrite);

export default router;
