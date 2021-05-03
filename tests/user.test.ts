import request from 'supertest';
import faker from 'faker';
import { StatusCodes } from 'http-status-codes';

import { User } from '../src/models';
import { app, sequelize } from '../src/app';

const makeFakeUser = () => ({
  name: faker.random.alphaNumeric(15),
  screenName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('Test /users', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.close();
  });

  test('It should be able to get all users', async () => {

  });

  test('It should be able to create a user', async () => {
    const fakeUser = makeFakeUser();
    const response = await request(app).post('/users').send(fakeUser);
    const user = await User.findOne({ where: fakeUser });

    expect(user).not.toBeNull();
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).not.toBe('');
  });

  test('It should be able to show a user', async () => {

  });

  test('It should be able to update a user', async () => {

  });

  test('It should be able to delete a user', async () => {

  });
});
