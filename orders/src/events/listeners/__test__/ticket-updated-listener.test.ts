import mongoose from "mongoose";
import { TickedUpdatedEvent } from "@minotec/common";
import { TicketUpdatedListener } from "../ticket-update-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/tickets";

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 20
  });
  await ticket.save();

  // create a fake data event
  const data: TickedUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'Metallica',
    price: 100,
    userId: 'laldkdk' 
  }

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, ticket };

};

it('finds, updates and saves a ticket', async () => {
  const { listener, data, msg, ticket} = await setup();

  await listener.onMessage(data, msg);

  const updateTicket = await Ticket.findById(ticket.id);

  expect(updateTicket!.title).toEqual(data.title);
  expect(updateTicket!.price).toEqual(data.price);
  expect(updateTicket!.version).toEqual(data.version);


});

it('acks the message', async () => {
  const { listener, data, msg, ticket} = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
  const { listener, data, msg, ticket} = await setup();

  data.version = 10;
  try{
    await listener.onMessage(data, msg);
  }catch(err){

  }
  
  expect(msg.ack).not.toHaveBeenCalled();


})