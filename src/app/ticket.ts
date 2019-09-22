import express from 'express';
import QRCode from 'qrcode';
import pug from 'pug';
import {io} from '../app';
import * as ticket from '../services/tickets';

export const ticketRouter = express.Router();

ticketRouter.get('/', async (req, res) => {
    const dataURL = await QRCode.toDataURL('http://192.168.0.108:8080/ticket',{ scale: 5 });
    res.render('ticket', {
        tickets: ticket.getTickets(),
        dataURL
    });
    
}).get('/ticket', (req, res) => {
    var ticketNumber = ticket.getNextTicket();
    ticket.addTicket(ticketNumber, false);
    io.emit('updateLayout', pug.render(
        `.col-sm-3.mb-3
            .card(id=ticketID)
                .card-body.text-center
                    h5.card-title #{ticketID}
                    p.card-text #{ticketStatus}`, 
                    {
                        ticketID: ticketNumber,
                        ticketStatus: 'Waiting'
                    })
    );
    io.emit('updateAdminLayout', pug.render(
        `.col-sm-3.mb-3
            .card
                .card-body.text-center
                    h5.card-title #{ticketID}
                    button.btn.btn-primary(type='button' id=ticketID onclick='releaseTicket(this.id)' disabled=ticketStatus) Notify`, 
                    {
                        ticketID: ticketNumber,
                        ticketStatus: false
                    })
    );
    res.render('ticket-info', {
        ticketNumber
    });
}).get('/admin', (req, res) => {
    res.render('admin', {
        tickets: ticket.getTickets()
    });
});