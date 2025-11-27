import express from 'express';
import multer from 'multer';
import {uploadCSV} from "../controllers/ContactController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Contact routes
router.post('/upload', upload.single('file'), uploadCSV)

export default router;