import request from 'supertest';
import { app } from '../app';

describe('Health/root', () => {
  it('GET / -> 200 and expected body', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(typeof res.text).toBe('string');
    expect(res.text).toContain('Hello, TypeScript with Express!');
  });
});
