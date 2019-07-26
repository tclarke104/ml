import { Router } from 'express';
import { getFiles } from '../controllers';

export const filesRouter = Router();

filesRouter.get('/files', getFiles);
