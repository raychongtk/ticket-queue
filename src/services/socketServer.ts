import {io} from '../app';
import * as ticket from './tickets';

export function listenEvents() {
    io.on('connection', (socket) => {
        socket.on('releaseTicket', (data) => {
            ticket.updateTicket(data);
            io.emit('ticket', data);
        })
    })
}