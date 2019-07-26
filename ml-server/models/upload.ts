import { Schema, model } from 'mongoose';
import { Upload } from './interfaces';

const UploadSchema = new Schema<Upload>({
    userId: String,
    uploadId: String,
    fileName: String,
    path: String
})

export const UploadModel = model<Upload>('Upload', UploadSchema);