import { Router } from 'express';
import { authenticate } from 'passport';
import { sign } from 'jsonwebtoken';

export const authRouter = Router();
const secret = 

authRouter.post('/signup', authenticate('local-signup'), (req, res) => {
    req.login(req.user, { session: false }, async (error) => {
        const body = { _id : req.user._id, email : req.user.local.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = sign({ user : body }, 'khwaamlapthiidii', { expiresIn: '24h' });
        res.send({ token })
    })
});

authRouter.post('/login', authenticate('local-login'), (req, res) => {
    req.login(req.user, { session: false }, async (error) => {
        const body = { _id : req.user._id, email : req.user.local.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = sign({ user : body },'khwaamlapthiidii', { expiresIn: '24h' });
        res.send({ token })
    })
});