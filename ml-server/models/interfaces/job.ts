import { JobStatus } from "../../../common/enum";
import { Document } from "mongoose";

export interface Job extends Document{
    userId: string;
    networkId: number;
    uploadId: number;
    status: JobStatus;
    completeTime: number;
    output: string;
}