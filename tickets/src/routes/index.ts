import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requiereAuth, validateRequest } from '@minotec/common';
import { Ticket } from '../models/ticket';


const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {

  const tickets = await Ticket.find({
    orderId: undefined
  });

  console.log(tickets)

  res.send(tickets);

});

export { router as indexTicketRouter };