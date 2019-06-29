import { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
    res.send('here is a user')
}