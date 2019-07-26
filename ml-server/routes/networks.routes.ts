import { Router } from 'express';
import { getNetworks, scheduleJob, getJobs } from '../controllers';

export const networksRouter = Router();

networksRouter.get('/networks', getNetworks);
networksRouter.get('/jobs', getJobs);

networksRouter.post('/network/schedule', scheduleJob)