import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {  NotFoundError } from '@minotec/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async(req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket){
    throw new NotFoundError(); 
  }

  res.send(ticket);

});


export { router as showTicketsRouter };