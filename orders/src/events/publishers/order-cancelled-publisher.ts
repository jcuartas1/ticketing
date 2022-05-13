import { Publisher, OrderCancelledEvent, Subjects } from "@minotec/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  readonly subject = Subjects.OrderCancelled;
}