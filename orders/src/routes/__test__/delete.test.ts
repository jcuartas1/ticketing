import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';

it('marks an order as cancelled', async () => {
  // Create a ticket with ticket Model

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Metallica',
    price: 20000
  });

  await ticket.save();

  const user = global.signin();
  // make a request to create an order

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)


  // make request to cancel the order
  const {body: cancelOrder} =  await request(app)
    .delete(`/api/orders/${response.body.order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);


  // expectation to make sure the thing is cancelled  
  const updatedOrder = await Order.findById(response.body.order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

});

it('emits a order cancelled event', async () => {

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Metallica',
    price: 20000
  });

  await ticket.save();

  const user = global.signin();
  // make a request to create an order

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)


  // make request to cancel the order
  const {body: cancelOrder} =  await request(app)
    .delete(`/api/orders/${response.body.order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

});