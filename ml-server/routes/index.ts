import { Router } from 'express';
import { userRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { uploadRouter } from './upload.routes';

export const restricedRouter = Router();
export const unrestrictedRouter = Router();

restricedRouter.get('/', (req, res) => {
  res.send({auth: true})
})
unrestrictedRouter.use(userRouter);
unrestrictedRouter.use(authRouter);
restricedRouter.use(uploadRouter);
