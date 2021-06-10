import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import type { ModelCtor } from 'sequelize';
import request from 'supertest';

import type SessionModel from '../src/models/session-model';
import type UserModel from '../src/models/user-model';
import Server from '../src/server';
import { omit } from '../src/util/helper';

const { app, db } = new Server();
const User = db.models.User as ModelCtor<UserModel>;
const Session = db.models.Session as ModelCtor<SessionModel>;

// TODO: Use User Factory
const buildFakeUser = () => ({
  name: faker.random.alphaNumeric(15),
  screenName: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'hN#u"[6?PPPN4V<',
});

const agent = request.agent(app);
const fakeCurrentUser = buildFakeUser();

describe('Test /api/users', () => {
  beforeAll(async () => {
    await db.sync({ force: true });

    // Seeding
    await User.create(fakeCurrentUser);
  });

  afterAll(async () => {
    await db.sync({ force: true });
    await db.close();
  });

  test('It should be able to create a new session (Login)', async () => {
    const { name, password } = fakeCurrentUser;

    const { status, body: { data: responseSession } } = await agent.post('/api/sessions').send({ name, password });
    const createdSession = await Session.findByPk(responseSession.id);

    /* Database */
    // Should find session in database after POST request
    expect(createdSession).not.toBeNull();
    // Should create session with fakeCurrentUser data
    expect(JSON.parse(createdSession.data)).toMatchObject(fakeCurrentUser);

    /* Response */
    // Should have status 201
    expect(status).toBe(StatusCodes.CREATED);

    // Should respond with the session created
    // No data / expires, only sid
    expect(responseSession.attributes).toMatchObject(omit(createdSession.get(), ['id', 'createdAt', 'updatedAt', 'data', 'expires']));
  });

  test('It should be able to delete a specific session (Logout)', async () => {
    const { name, password } = fakeCurrentUser;
    const { body: { data: session } } = await agent.post('/api/sessions').send({ name, password });
    const { status, body: { data: responseSession } } = await agent.delete('/api/sessions');
    const deletedSession = await Session.findByPk(session.id);

    /* Database */
    // Should delete session in database after DELETE request
    expect(deletedSession).toBeNull();

    /* Response */
    // TODO: test only one status, 200 or 204?
    expect([StatusCodes.OK, StatusCodes.NO_CONTENT]).toContain(status);
    // Should respond with empty content, or [] due to the restriction of jsonapi-typescript library
    expect([undefined, '[]']).toContain(JSON.stringify(responseSession));
  });
});
