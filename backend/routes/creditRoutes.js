import express from 'express';
import multer from 'multer';
import { uploadXML, getProfiles } from '../controllers/creditController.js';

const creditRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// Routes
creditRouter.post('/upload-xml', upload.single('file'), uploadXML);
creditRouter.get('/profiles', getProfiles);

export default creditRouter;
