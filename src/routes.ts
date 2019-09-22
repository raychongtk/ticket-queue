import express from 'express';
import {ticketRouter} from './app/ticket';

export const router = express.Router()
        .use('/', ticketRouter);