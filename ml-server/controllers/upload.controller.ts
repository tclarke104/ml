import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import path from 'path';
import { existsSync, mkdirSync }  from 'fs';
import { UploadModel } from '../models';
import { AppSettings } from '../appSettings';

export const upload = (req: Request, res: Response) => {
    try{
        console.log(`uploaded ${req.file.filename}`);
        let upload = new UploadModel({
            userId:req.user._id,
            uploadId: req.body.uploadId,
            fileName: req.body.fileName,
            path: req.file.path,
            uploadTime: Date.now()
        })

        upload.save( 
            (err, doc) => {
                if (err) return res.send(500);
                return res.json();
            }    
        );

    } catch (error){
        console.warn(error);
    }
}