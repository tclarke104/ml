
import { UploadModel } from '../models';
import { Request, Response } from 'express';
import _ from 'lodash';
import { Upload } from '../models/interfaces';

export const getFiles = (req: Request, res: Response) => {
    UploadModel.find(
        {'userId': req.user._id},
        (err: any, uploads: Upload[]) => {
            let grouped = _.reduce(uploads, (acc: any[], currentUpload: Upload) => {
                let inUploads = _.findIndex(acc, (upload: Upload) => upload.uploadId === currentUpload.uploadId);
                if (inUploads === -1) {
                    acc.push({ uploadId: currentUpload.uploadId, fileName: currentUpload.fileName });
                }
                return acc;
            }, [])
            res.json(grouped);
        }
    )
}