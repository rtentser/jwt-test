import { Router } from 'express';
import multer from 'multer';
import { auth } from '../middlewares/auth.js';
import { uploadFile, listFiles, deleteFile, getFile, downloadFile, updateFile } from '../controllers/fileController.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/list', auth, listFiles);
router.delete('/delete/:id', auth, deleteFile);
router.get('/:id', auth, getFile);
router.get('/download/:id', auth, downloadFile);
router.put('/update/:id', auth, upload.single('file'), updateFile);

export default router;
