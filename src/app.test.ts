import request from 'supertest';
import faker from 'faker';

import { User } from '../models';
import { app, sequelize } from './app';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});

describe('Test /users', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
  });

  test('It should be able to create a user', async () => {
    const fakeUser = {
      name: faker.random.alphaNumeric(15),
      screenName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app).post('/users').send(fakeUser);

    const user = await User.findOne({ where: fakeUser });

    expect(user).not.toBeNull();
    expect(response.status).toBe(201);
    expect(response.body).not.toBe('');
  });
});
