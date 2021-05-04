import request from 'supertest';

import app from '../src/lib/app';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});
