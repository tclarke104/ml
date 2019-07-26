import { Schema, model } from 'mongoose';
import { Network } from './interfaces';

const NetworkSchema = new Schema<Network>({
    model_name: String,
    num_classes: Number,
    path: String,
    classes: [String],
    test_acc: Number
})

export const NetworkModel = model<Network>('Network', NetworkSchema);