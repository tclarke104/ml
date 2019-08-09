export interface TrainJobViewModel {
    _id?: string;
    batchSize: Number;
    workers: Number;
    epochs: Number;
    networkName?: String;
    models?: String[];
    device: Number;
    parallel: Boolean;
    mixed: Boolean;
    noWeights: Boolean;
    classes: string[];
}