import { Document } from "mongoose";

export interface EpochInfo extends Document{
    jobId: Number,
    currentEpoch: Number,
    testAcc: Number,
    trainAcc: Number,
    trainLoss: Number,
    time: Number
}