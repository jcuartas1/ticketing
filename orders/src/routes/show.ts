import express, { Request, Response } from 'express';
import { requiereAuth, NotFoundError, NotAuthorizedError } from '@minotec/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requiereAuth, async (req: Request, res: Response) => {
  // Add valid Order Id on params

  const order = await Order.findById(req.params.orderId).populate('ticket');

  if(!order){
    throw new NotFoundError();
  }
  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }

  res.send(order);

});

export { router as showOrderRouter };