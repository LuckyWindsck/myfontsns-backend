import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import Server from '../src/server';

const { app, db } = new Server();
const { User } = db.models;

const buildFakeUser = () => ({
  name: faker.random.alphaNumeric(15),
  screenName: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'hN#u"[6?PPPN4V<',
});

const omit = (obj: any, keys: string[]) => (
  // @ts-ignore
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))
);

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
    const { status, body: { data: responseUsers } } = await request(app).get('/users');

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the amount of users same as the amount of users in database
    expect(responseUsers.length).toBe(userCount);
    // Should respond with all users in database
    expect(responseUsers.map((user) => user.attributes)).toMatchObject(
      users.map((user) => omit(user.get(), ['id', 'createdAt', 'updatedAt'])),
    );
  });

  test('It should create a user', async () => {
    const { name, ...fakeUser } = buildFakeUser();
    const { status, body: { data: responseUser } } = await request(app).post('/users').send(fakeUser);
    const createdUser = await User.findByPk(responseUser.id);

    /* Database */
    // Should find user in database after POST request
    expect(createdUser).not.toBeNull();
    // Should create user with fakeUser data
    expect(omit(createdUser.get(), ['email'])).toMatchObject(omit(fakeUser, ['email']));

    /* Response */
    // Should have status 201
    expect(status).toBe(StatusCodes.CREATED);
    // Should respond with the user created
    expect(responseUser.attributes).toMatchObject(omit(createdUser.get(), ['id', 'createdAt', 'updatedAt']));
  });

  test('It should be able to display a user', async () => {
    const user = await User.findOne({ order: db.random() });
    const { status, body: { data: responseUser } } = await request(app).get(`/users/${user.id}`);

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user specified
    expect(responseUser.attributes).toMatchObject(omit(user.get(), ['id', 'createdAt', 'updatedAt']));
  });

  test('It should be able to update a user', async () => {
    const fakeUser = buildFakeUser();
    const user = await User.findOne({ order: db.random() });
    const { status, body: { data: responseUser } } = await request(app).put(`/users/${user.id}`).send(fakeUser);
    const updatedUser = await User.findByPk(user.id);

    /* Database */
    // Should update user with fakeUser data after PUT request
    expect(omit(updatedUser.get(), ['email'])).toMatchObject(omit(fakeUser, ['email']));

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user updated
    expect(responseUser.attributes).toMatchObject(omit(updatedUser.get(), ['id', 'createdAt', 'updatedAt']));
  });

  test('It should be able to delete a user', async () => {
    const user = await User.findOne({ order: db.random() });
    const { status, body: { data: responseUser } } = await request(app).delete(`/users/${user.id}`);
    const deletedUser = await User.findByPk(user.id, { paranoid: false });

    /* Database */
    // Should not be delete user in database after DELETE request
    expect(deletedUser).not.toBeNull();

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user deleted
    expect(responseUser.attributes).toMatchObject(omit(user.get(), ['id', 'createdAt', 'updatedAt', 'deletedAt']));
  });
});
