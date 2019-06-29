import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { restricedRouter, unrestrictedRouter } from './routes';
import { connect, connection as db} from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { passportInit } from './config/passport';
import { ensureLoggedIn } from 'connect-ensure-login';
import { ensureAuthenticated } from './middleware/auth.middleware';

export const app = express();
const port: number = 8888;
passportInit(passport)


// connect to mongo
connect('mongodb://localhost/ml', {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>console.log('connected to mongo'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());// persistent login sessions
app.use('/', unrestrictedRouter);
app.use('/', ensureAuthenticated, restricedRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );