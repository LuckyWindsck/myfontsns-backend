import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import type { ModelCtor } from 'sequelize';
import request from 'supertest';

import type UserModel from '../src/models/user-model';
import Server from '../src/server';
import { omit } from '../src/util/helper';

const { app, db } = new Server();
const User = db.models.User as ModelCtor<UserModel>;

// TODO: Use User Factory
const buildFakeUser = () => ({
  name: faker.random.alphaNumeric(15),
  screenName: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'hN#u"[6?PPPN4V<',
});

const agent = request.agent(app);

describe('Test /api/users', () => {
  beforeAll(async () => {
    await db.sync({ force: true });

    // Seeding
    const fakeUserCount = 25;
    const fakeUsers = Array(fakeUserCount).fill(null).map(buildFakeUser);

    await User.bulkCreate(fakeUsers);

    // Login
    const fakeCurrentUser = fakeUsers[0];
    const { name, password } = fakeCurrentUser;

    await agent.post('/api/sessions').send({ name, password });
  });

  afterAll(async () => {
    await db.sync({ force: true });
    await db.close();
  });

  test('It should be able to display all users', async () => {
    const { count: userCount, rows: users } = await User.findAndCountAll();
    const { status, body: { data: responseUsers } } = await agent.get('/api/users');

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

  test('It should be able to create a user', async () => {
    const fakeUser = buildFakeUser();
    const { status, body: { data: responseUser } } = await agent.post('/api/users').send(fakeUser);
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
    const { status, body: { data: responseUser } } = await agent.get(`/api/users/${user.id}`);

    /* Response */
    // Should have status 200
    expect(status).toBe(StatusCodes.OK);
    // Should respond with the user specified
    expect(responseUser.attributes).toMatchObject(omit(user.get(), ['id', 'createdAt', 'updatedAt']));
  });

  test('It should be able to update a user', async () => {
    const fakeUser = buildFakeUser();
    const user = await User.findOne({ order: db.random() });
    const { status, body: { data: responseUser } } = await agent.put(`/api/users/${user.id}`).send(fakeUser);
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
    const { status, body: { data: responseUser } } = await agent.delete(`/api/users/${user.id}`);
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
