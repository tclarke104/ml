import { Router } from 'express';
import { upload } from '../controllers/upload.controller';

export const uploadRouter = Router();

uploadRouter.post('/upload', upload)