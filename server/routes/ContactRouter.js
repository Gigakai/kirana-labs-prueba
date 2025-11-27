import express from 'express';
import multer from 'multer';
import {uploadCSV} from "../controllers/ContactController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Contact routes
router.post('/contact', upload.single('avatar'), uploadCSV)

export default router;