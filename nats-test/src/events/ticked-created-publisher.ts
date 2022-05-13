import { Publisher } from "./base-publisher";
import { TickedCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TickedCreatedPublisher extends Publisher<TickedCreatedEvent> {

  readonly subject = Subjects.TicketCreated;

  

}