import { Document } from 'mongoose';

export interface Network extends Document{
    model_name: String;
    num_classes: Number;
    path: String;
    classes: String[];
    test_acc: Number;
}