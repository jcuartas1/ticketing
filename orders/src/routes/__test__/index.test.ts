import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/tickets';


const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();

  return ticket;
}


it('fetches orders for an particular user', async () => {

  // Create 3 tickets

  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();
  // Create one order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ticketId: ticketOne.id})
    .expect(201)

  // Crete two orders as User #2
  await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ticketId: ticketTwo.id})
    .expect(201)

    await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ticketId: ticketThree.id})
    .expect(201)

  // Make reques to get orders for User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  // Make sure we only got the orders for User #2
  expect(response.body.orders.length).toEqual(2);
  


});