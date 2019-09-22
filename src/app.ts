import express from 'express';
import {router} from './routes';
import socket from 'socket.io';
import * as socketService from './services/socketServer';

export const app = express();
const server = require('http').createServer(app);
export const io = socket.listen(server);

app.set('views',"./src/views")
   .set('view engine', 'pug')
   .use('/', router);

server.listen(8080,function()
{
    console.log('app is listening on port 8080')
});

socketService.listenEvents();