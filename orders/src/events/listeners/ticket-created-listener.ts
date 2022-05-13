import { Message } from "node-nats-streaming";
import { Subjects, Listener, TickedCreatedEvent } from "@minotec/common";
import { Ticket } from "../../models/tickets";
import { queueGroupName } from "./queue-group-name";


export class TickedCreatedListener extends Listener<TickedCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: TickedCreatedEvent['data'], msg: Message) {
     const { id, title, price } = data;
     const ticket = Ticket.build({
       id,
       title, price
     });
     await ticket.save();

     msg.ack();
  }
}
