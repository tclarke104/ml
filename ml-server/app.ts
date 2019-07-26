import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import { restricedRouter, unrestrictedRouter } from './routes';
import { connect, connection as db} from 'mongoose';
import passport from 'passport';
import { passportInit } from './config/passport';
import cors from 'cors';
import { AppSettings } from './appSettings';

export const app = express();
const port: number = AppSettings.port;
passportInit(passport)

app.use(cors());
// connect to mongo
connect(AppSettings.mongoUrl, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>console.log('connected to mongo'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', unrestrictedRouter);
app.use('/', passport.authenticate('jwt', { session : false }), restricedRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );