import request from 'supertest';
import faker from 'faker';
import { StatusCodes } from 'http-status-codes';

import { User } from '../src/models';
import app from '../src/lib/app';
import db from '../src/lib/db';

const buildFakeUser = () => ({
  name: faker.random.alphaNumeric(15),
  screenName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

// Normalize because createdAt & updatedAt are Date in user but string in response.body
const normalize = (obj) => JSON.parse(JSON.stringify(obj));

describe('Test /users', () => {
  beforeAll(async () => {
    await db.sync({ force: true });

    // Seeding
    const fakeUserCount = 25;
    const fakeUsers = Array(fakeUserCount).fill(null).map(buildFakeUser);

    await User.bulkCreate(fakeUsers);
  });

  afterAll(async () => {
    await db.sync({ force: true });
    await db.close();
  });

  test('It should display all users', async () => {
    const { count: userCount, rows: users } = await User.findAndCountAll();
    const { status, body: responseUsers } = await request(app).get('/users');

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the amount of users same as the amount of users in database
    expect(responseUsers.length).toBe(userCount);
    // Should respond with all users in database
    expect(responseUsers).toMatchObject(normalize(users));
  });

  test('It should create a user', async () => {
    const fakeUser = buildFakeUser();
    const { status, body: responseUser } = await request(app).post('/users').send(fakeUser);
    const user = await User.findOne({ where: fakeUser });

    /* Database */
    // Should find user in database after POST request
    expect(user).not.toBeNull();
    // Should create user with fakeUser data
    expect(user).toMatchObject(fakeUser);

    /* Response */
    // Should have status 201
    expect(status).toBe(StatusCodes.CREATED);
    // Should respond with the user created
    expect(responseUser).toMatchObject(normalize(user));
  });

  test('It should be able to display a user', async () => {
    const user = await User.findOne({ order: db.random() });
    const { status, body: responseUser } = await request(app).get(`/users/${user.id}`);

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user specified
    expect(responseUser).toMatchObject(normalize(user));
  });

  test('It should be able to update a user', async () => {
    const fakeUser = buildFakeUser();
    const user = await User.findOne({ order: db.random() });
    const { status, body: responseUser } = await request(app).put(`/users/${user.id}`).send(fakeUser);
    const updatedUser = await User.findByPk(user.id);

    /* Database */
    // Should update user with fakeUser data after PUT request
    expect(updatedUser).toMatchObject(fakeUser);

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user updated
    expect(responseUser).toMatchObject(normalize(updatedUser));
  });

  test('It should be able to delete a user', async () => {
    const user = await User.findOne({ order: db.random() });
    const { status, body: responseUser } = await request(app).delete(`/users/${user.id}`);
    const deletedUser = await User.findByPk(user.id);

    /* Database */
    // Should delete user in database after DELETE request
    expect(deletedUser).toBeNull();

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user deleted
    expect(responseUser).toMatchObject(normalize(user));
  });
});
