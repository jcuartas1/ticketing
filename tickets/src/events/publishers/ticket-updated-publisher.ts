import { Publisher, Subjects, TickedUpdatedEvent } from "@minotec/common";

export class TicketUpdatedPublisher extends Publisher<TickedUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
}