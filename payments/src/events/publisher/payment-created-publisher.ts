import { Subjects, Publisher, PaymentCreatedEvent } from "@minotec/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  readonly subject = Subjects.PaymentCreated;    
}