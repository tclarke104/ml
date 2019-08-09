import { Schema, model } from 'mongoose';
import { EpochInfo } from './interfaces/epochInfo';

const EpochInfoSchema = new Schema<EpochInfo>({
    jobId: String,
    currentEpoch: Number,
    testAcc: Number,
    trainAcc: Number,
    trainLoss: Number,
    time: Number
})

export const EpochInfoModel = model<EpochInfo>('EpochInfo', EpochInfoSchema, 'epochInfos');