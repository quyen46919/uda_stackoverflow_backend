import express from 'express';
const router = express.Router();
import imageController from '../controllers/image.controller';
import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/images');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router
    .get('/:filename', imageController.getImage)
    .post('/', upload.single('file'), imageController.uploadSingleImage)
    .post('/multiple', upload.array('files', 15), imageController.uploadMultipleImages);

export default router;