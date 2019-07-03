import { Router } from 'express';
import { userRouter } from './users';
import { authRouter } from './auth';

export const restricedRouter = Router();
export const unrestrictedRouter = Router();

restricedRouter.get('/', (req, res) => {
  res.send({auth: true})
})
unrestrictedRouter.use(userRouter);
unrestrictedRouter.use(authRouter);
