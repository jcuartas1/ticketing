import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/tickets';


it('fetches the order', async () => {
  // Create a ticket

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Metallica',
    price: 20000
  });

  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket

  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)


  // make request to fetch the order
  const {body: fetchedOrder} =  await request(app)
    .get(`/api/orders/${response.body.order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);


  expect(fetchedOrder.id).toEqual(response.body.order.id);
})