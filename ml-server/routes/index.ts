import { Router } from 'express';
import { userRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { uploadRouter } from './upload.routes';
import { filesRouter } from './files.routes';
import { networksRouter } from './networks.routes';
import { trainRouter } from './train.routes';

export const restricedRouter = Router();
export const unrestrictedRouter = Router();

restricedRouter.get('/', (req, res) => {
  res.send({auth: true})
})
unrestrictedRouter.use(userRouter);
unrestrictedRouter.use(authRouter);
restricedRouter.use(uploadRouter);
restricedRouter.use(filesRouter);
restricedRouter.use(networksRouter);
restricedRouter.use(trainRouter);

