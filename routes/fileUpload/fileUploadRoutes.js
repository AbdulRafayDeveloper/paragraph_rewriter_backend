// routes/fileUploadRoutes.js
import express from 'express';
import { upload } from '../../helpers/fileUpload.js'; // Adjust the path as needed
import { readFile } from '../../controllers/fileUpload/fileUpload.js'; // Adjust the path as needed

const router = express.Router();

// Define the file upload route
router.post('/upload', upload.single('file'), readFile);

export default router;
