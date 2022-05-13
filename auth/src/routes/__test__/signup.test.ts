import request from 'supertest';
import { app } from '../../app';



it('return a 201 on succesful signup', async () => {

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123455678'
    })
    .expect(201);

});

it('returns a 400 with an invalid email', async() => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'testyydydy',
        password: '123455678'
      })
      .expect(400);
});

it('returns a 400 with an invalid password', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

it('disallows duplicate emails', async() => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(201);

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: '1234567'
  })
  .expect(400); 

});

it('sets a cookie after successful email signup', async() => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234567'
    })
    .expect(201);
  
  expect(response.get('Set-Cookie')).toBeDefined();

});