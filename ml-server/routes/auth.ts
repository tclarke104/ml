import { Router } from 'express';
import { authenticate } from 'passport';

export const authRouter = Router();

authRouter.post('/signup', authenticate('local-signup'), (req, res) => {
    res.send('woohoo')
});
authRouter.post('/login', authenticate('local-login'), (req, res) => {
    res.send('woohoo')
});