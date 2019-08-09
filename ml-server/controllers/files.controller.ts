
import { UploadModel } from '../models';
import { Request, Response } from 'express';
import _ from 'lodash';
import { Upload } from '../models/interfaces';
import { FileViewModel } from '../../common';

export const getFiles = (req: Request, res: Response) => {
    UploadModel.find(
        {'userId': req.user._id},
        (err: any, uploads: Upload[]) => {
            let grouped = _.reduce(uploads, (acc: FileViewModel[], currentUpload: Upload) => {
                let inUploads = _.findIndex(acc, (upload: FileViewModel) => upload.uploadId === currentUpload.uploadId);
                if (inUploads === -1) {
                    acc.push({ uploadId: currentUpload.uploadId, fileName: currentUpload.fileName, uploadTime: currentUpload.uploadTime });
                }
                return acc;
            }, [])
            res.json(grouped);
        }
    )
}