import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global { var signin: (id?: string) => string[]; }

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51IQBt2JaJG1CwNMePlLwGGybAL0RNk68JpZNeDhRXlrDOd8qWFJGSWdwhlyOjwT09A42qsvTSZBhgXMRe9ROB4NB00AD9lY7XL';

let mongo: any;

beforeAll( async() => {
  process.env.JWT_KEY = 'qwwetyg';
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async() => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({});
  }
});

afterAll(async() => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {

  // Build a JWT a payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }
  // Create the JWT!

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object { jwt: MY_JWT }

  const session = { jwt: token };

  // Turn that session into JSON

  const sessionJson = JSON.stringify(session);

  // Take JSON and encode it as base64

  const base64 = Buffer.from(sessionJson).toString('base64');

  // return a string thats the cookie with the encoded data

  return [`session=${base64}`];

}

