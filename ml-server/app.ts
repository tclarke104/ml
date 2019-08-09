import createError from 'http-errors';
import express, { Request, Response } from 'express';
import logger from 'morgan';
import { restricedRouter, unrestrictedRouter } from './routes';
import { connect, connection as db} from 'mongoose';
import passport from 'passport';
import { passportInit } from './config/passport';
import cors from 'cors';
import { AppSettings } from './appSettings';
import http from 'http';
import socketio from 'socket.io';
import socketioJwt from 'socketio-jwt';
import redis from 'redis'
import { getJobViewModels } from './controllers';

let attachSocket = (req: Request, res: Response, next: any) => {
  res.locals.socketio = io;
  redisClient.lrange(req.user._id, 0, -1, function(err, sockets) {
    res.locals.socketIds = sockets;
    next();
  });
}

//initialize app, socketio and redis
export const app = express();
const port: number = AppSettings.port;
let server = new http.Server(app);
let io = socketio(server);
let redisClient = redis.createClient();

//initialize socket io connection
io.use(socketioJwt.authorize({
  secret: AppSettings.secret,
  decodedPropertyName: 'decoded_token',
  handshake: true,
  timeout: 15000 // 15 seconds to send the authentication message
}))

io.on('connection', (socket:any) => {
  socket.join(socket.decoded_token.user._id);
  redisClient.lpush(socket.decoded_token.user._id, socket.id)
  socket.on('disconnect', function(){
    console.log('client disconnected')
    redisClient.lrem(socket.decoded_token.user._id, 0, socket.id)
  });
  socket.on('getJobs', async (message:any) => {
    let jobs = await getJobViewModels(socket.decoded_token.user._id);
    io.to(socket.decoded_token.user._id).emit('jobs', jobs);
  })
  console.log('client connected')
})

//init passport for auth
passportInit(passport)

//set up cors
app.use(cors());
// connect to mongo
connect(AppSettings.mongoUrl, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', (ref)=> {
  console.log(db.collections)
  console.log('connected to mongo')
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', unrestrictedRouter);
app.use('/', passport.authenticate('jwt', { session : false }), attachSocket, restricedRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// start the Express server
server.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
