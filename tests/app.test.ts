import request from 'supertest';

import Server from '../src/server';

const { app } = new Server();

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});
