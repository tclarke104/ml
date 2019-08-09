import { Request, Response } from 'express';
import _ from 'lodash';
import { Network } from '../models/interfaces';
import { NetworkModel } from '../models/networks';
import { JobModel } from '../models/job';
import { JobStatus } from '../../common/enum';
import { AppSettings } from '../appSettings';
import { UploadModel } from '../models';
import { JobViewModel } from '../../common';
import { EpochInfoModel } from '../models/epochInfo';

var celery = require('node-celery'),
	client = celery.createClient({
        CELERY_BROKER_URL:  AppSettings.rabbitUrl,
        CELERY_RESULT_BACKEND: AppSettings.redisUrl
	});

export const getNetworks = (req: Request, res: Response) => {
    NetworkModel.find(
        {},
        (err: any, networks: Network[]) => {
            let mapped = _.map( networks, network => {
                return {
                    id: network.id,
                    modelName: network.model_name,
                    numClasses: network.num_classes,
                    classes: network.classes,
                    testAcc: network.test_acc,
                }
            })
            res.json(mapped);
        }
    )
}

export const scheduleJob = async (req: Request, res: Response) => {
    let network = await NetworkModel.findById(req.body.networkId);
    if(network) {
        let job = new JobModel({
            userId: req.user._id,
            networkId: network._id,
            uploadId: req.body.uploadId,
            status: JobStatus.SCHEDULED,
            completeTime: null,
            output: null
        });
        let result = await job.save();

        let evaluation = client.call('eval_job.evaluate', [result.networkId, result.uploadId, result._id]);

        evaluation.on('error', async(data:any) => {
            NetworkModel.updateOne({'_id': result._id}, {status: JobStatus.FAILED})
        })
        evaluation.on('ready', async (data: any) => {
            let jobs = await getJobViewModels(req.user._id)
            res.locals.socketio.to(req.user._id).emit('jobs', jobs);
        })
        res.json({jobId: result._id});
    } else {
        throw new Error('proposed network does not exist')
    }
}

export const getJobViewModels = async (userId: string): Promise<JobViewModel[]> => {
    let jobs = await JobModel.find({'userId': userId});
    let promises = _.map(jobs, async job => {
        let fileName = await UploadModel.findOne({'uploadId': job.uploadId});
        return {
            status: job.status,
            diagnosis: job.output? job.output: 'TBD',
            id: job._id,
            fileName: fileName ? fileName.fileName: ''
        }
    });
    let jobViewModels = await Promise.all(promises);
    return jobViewModels;
}

export const getJobs = async (req: Request, res: Response) => {
    let jobViewModels = await getJobViewModels(req.user._id);
    res.json(jobViewModels);
}
