import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signin out', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123455678'
    })
    .expect(201);

    const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
});

// declare global { var signin => Promise<string[]>; }