import mongoose from "mongoose";
import { ExpirationCompleteEvent, OrderStatus } from "@minotec/common";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/tickets";
import { Order } from "../../../models/order";

const setup = async () => {
  // create an instance of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 20
  });

  await ticket.save();
  const order = Order.build({
    userId: 'lslsld',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket
  });
  await order.save();

  // create a fake data event
  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  }

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, ticket, order };

};

it('updates the order status to cancelled', async () => {
  const { listener, data, msg, ticket, order  } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  const updateOrder = await Order.findById(order.id);
  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);

  
});

it('emit an OrderCancelled event', async () => {
  const { listener, data, msg, order } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  
  const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])

  // write assertions to make sure a ask function  was called!
  expect(eventData.id).toEqual(order.id);
});


it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg)

  // write assertions to make sure a ask function  was called!
  expect(msg.ack).toHaveBeenCalled();
});