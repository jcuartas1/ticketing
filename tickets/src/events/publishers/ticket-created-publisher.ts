import { Publisher, Subjects, TickedCreatedEvent } from "@minotec/common";

export class TicketCreatedPublisher extends Publisher<TickedCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
}