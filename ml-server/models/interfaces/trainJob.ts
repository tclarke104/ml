import { Document } from "mongoose";

export interface TrainJob extends Document{
    batchSize: Number;
    epochs: Number;
    networkName?: String;
    models?: String[];
    device: Number;
    parallel: Boolean;
    mixed: Boolean;
    noWeights: Boolean;
    classes: string[];
    status: String;
}