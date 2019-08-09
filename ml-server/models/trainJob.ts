import { Schema, model } from 'mongoose';
import { Network } from './interfaces';
import { TrainJob } from './interfaces/trainJob';

const TrainJobSchema = new Schema<TrainJob>({
    batchSize: Number,
    epochs: Number,
    workers: Number,
    networkName: String,
    models: [String],
    device: Number,
    parallel: Boolean,
    mixed: Boolean,
    noWeights: Boolean,
    classes: [String],
    status: String,
})

export const TrainJobModel = model<TrainJob>('TrainJob', TrainJobSchema);