import { Document } from 'mongoose';

export interface Upload extends Document {
    userId: string;
    uploadId: string;
    fileName: string;
    path: string;
    uploadTime: number;
}