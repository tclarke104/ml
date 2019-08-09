import { Request, Response, NextFunction } from "express";
import { TrainJobViewModel, EpochInfoViewModel } from '../../common';
import { AppSettings } from "../appSettings";
import { TrainJobModel } from "../models/trainJob";
import { EpochInfoModel } from "../models/epochInfo";
import _ from 'lodash';
import { PreprocessedImageModel } from "../models/preprocessedImage";


var celery = require('node-celery'),
	client = celery.createClient({
        CELERY_BROKER_URL:  AppSettings.rabbitUrl,
        CELERY_RESULT_BACKEND: AppSettings.redisUrl
    });
    
const buildEpochInfoViewModel = (lastEpoch: any) => {
    let lastEpochViewModel: EpochInfoViewModel = {
        jobId: lastEpoch.jobId,
        currentEpoch: lastEpoch.currentEpoch,
        testAcc: lastEpoch.testAcc,
        trainAcc: lastEpoch.trainAcc,
        trainLoss: lastEpoch.trainLoss,
        time: lastEpoch.time
    }
    return lastEpochViewModel
}

export const startTraining = async (req: Request, res:Response, next:NextFunction) => {
    let jobInfo = req.body as TrainJobViewModel;

    let trainJob =  new TrainJobModel({
        batchSize: jobInfo.batchSize,
        epochs: jobInfo.epochs,
        workers: jobInfo.workers,
        networkName: jobInfo.networkName,
        models: jobInfo.models,
        device: jobInfo.device,
        parallel: jobInfo.parallel,
        mixed: jobInfo.mixed,
        noWeights: jobInfo.noWeights,
        classes: jobInfo.classes,
        status: 'SCHEDULED'
    })

    let job = await trainJob.save()

    let trainJobWorker = client.call('eval_job.train', [
        jobInfo.batchSize,
        jobInfo.workers,
        jobInfo.epochs,
        jobInfo.networkName,
        jobInfo.models,
        jobInfo.device,
        jobInfo.parallel,
        jobInfo.mixed,
        jobInfo.noWeights,
        jobInfo.classes,
        job._id
    ]);
    trainJobWorker.on('ready', async ()=> {
        let trainJobs = await TrainJobModel.find({});
        res.locals.socketio.to(req.user._id).emit('trainJobs', trainJobs);
    })
    res.json({jobId: job._id})

}

export const getTrainJobs = async (req: Request, res:Response, next:NextFunction) => {
    let jobs = await TrainJobModel.find({});
    res.json(jobs);
}

export const getTrainJobInfo = async (req: Request, res:Response) => {
    let epochs = await EpochInfoModel.find({'jobId': req.params.id});
    let lastEpoch = _.maxBy(epochs, epoch => epoch.currentEpoch);
    if(lastEpoch) {
        const lastEpochViewModel = buildEpochInfoViewModel(lastEpoch)
        res.send(lastEpochViewModel);
    } else {
        res.send(null);
    }
}

export const getClasses = async (req: Request, res:Response, next:NextFunction) => {
    let imageDocs = await PreprocessedImageModel.find({});
    let unique = _.chain(imageDocs).map('diagnosis').uniq().value();
    return res.json(unique);
}