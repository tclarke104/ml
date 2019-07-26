import { JobStatus } from "./enum";

export interface JobViewModel {
    status: JobStatus,
    diagnosis: string,
    id: string,
    fileName: string
}