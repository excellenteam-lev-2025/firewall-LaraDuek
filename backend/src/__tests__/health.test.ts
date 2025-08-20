import request from 'supertest';
import { app } from '../app';

describe('Health/root', () => {
  it('GET / -> 200 and expected body', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'ok',
        message: expect.any(String),
      })
    );
  });
});