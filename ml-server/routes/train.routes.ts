import { Router } from 'express';
import { getTrainJobs, getClasses, startTraining, getTrainJobInfo } from '../controllers/train.controller';

export const trainRouter = Router();

trainRouter.get('/train/jobs', getTrainJobs);
trainRouter.get('/train/classes', getClasses);
trainRouter.get('/train/job/:id', getTrainJobInfo);

trainRouter.post('/train/job', startTraining);
