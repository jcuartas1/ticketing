import { Subjects, Publisher, ExpirationCompleteEvent } from "@minotec/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;

}