import nats from 'node-nats-streaming';
import { TickedCreatedPublisher } from './events/ticked-created-publisher';


console.clear();

const stan = nats.connect('ticketing','abc', {
  url: 'http://localhost:4222'
});

//@ts-ignore
stan.on('connect', async () => {
  console.log('Publisher connetec to NATS');

  const publisher = new TickedCreatedPublisher(stan);
  try {

    await publisher.publish({
      id: '123466',
      title: 'Metallica',
      price: 20000
    });
    
  } catch (err) {

    console.error(err);
    
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // });

  // stan.publish('ticket:created', data, () =>{
  //   console.log('Event Publish');
  // })

})