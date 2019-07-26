import { Schema, model } from 'mongoose';
import { Network } from './interfaces';
import { Job } from './interfaces/job';

const JobSchema = new Schema<Job>({
    userId: String,
    networkId: String,
    status: String,
    uploadId: String,
    completeTime: Number,
    output: String
})

export const JobModel = model<Job>('Job', JobSchema);