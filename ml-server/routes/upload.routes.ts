import { Router } from 'express';
import { upload } from '../controllers/upload.controller';
import path from 'path';
import multer from 'multer';
import { existsSync, mkdirSync } from 'fs';

const uploadHandler = multer({
    storage: multer.diskStorage({
      destination: (req:any, file, callback) => {
        let filePath = path.join('/home/travis/uploads', req.user._id, req.body.uploadId);
        if(!existsSync(filePath)) {
            mkdirSync(filePath, { recursive: true });
        }
        callback(null, filePath)
      },
      filename: (req, file, callback) => {
        //originalname is the uploaded file's name with extn
        callback(null, file.originalname);
      }
    })
  });

export const uploadRouter = Router();

uploadRouter.post('/upload', uploadHandler.single('file'), upload)