import { api, prefix } from './helpers/request';

jest.mock('../services/rule.service', () => ({
  getAllRules: jest.fn().mockResolvedValue({
    mode: 'whitelist',
    totals: { ip: 0, port: 0, url: 0 },
  }),
  toggleMultipleRules: jest.fn().mockResolvedValue([
    { id: 1, value: '1.1.1.1', active: true },
  ]),
}));

import { getAllRules, toggleMultipleRules } from '../services/rule.service';

describe('Rules endpoint (GET + PUT)', () => {
  beforeEach(() => jest.clearAllMocks());

  it('GET /rules → 200 y { status, rules }', async () => {
    const res = await api().get(`${prefix}/rules`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'success',
        rules: expect.any(Object),
      })
    );
    expect(getAllRules).toHaveBeenCalledTimes(1);
  });

  it('GET /rules → 500 if service throws error', async () => {
    (getAllRules as jest.Mock).mockRejectedValueOnce(new Error('boom'));
    const res = await api().get(`${prefix}/rules`);
    expect(res.status).toBe(500);
    expect(String(res.body?.error ?? res.text)).toMatch(/internal/i);
  });

  it('PUT /rules → 2xx with complete payload (ips, urls, ports)', async () => {
    const body = {
      ips:   { ids: [1, 2], mode: 'whitelist' as const, active: true },
      urls:  { ids: [3],    mode: 'blacklist' as const, active: false },
      ports: { ids: [4],    mode: 'whitelist' as const, active: true },
    };

    const res = await api().put(`${prefix}/rules`).send(body);
    expect(res.status).toBeLessThan(400);
    expect(toggleMultipleRules).toHaveBeenCalledTimes(1);
    expect(toggleMultipleRules).toHaveBeenCalledWith(body);

  });

  it('PUT /rules → 2xx with partial payload (only ips)', async () => {
    const body = {
      ips: { ids: [10], mode: 'blacklist' as const, active: false },
    };

    const res = await api().put(`${prefix}/rules`).send(body);
    expect(res.status).toBeLessThan(400);
    expect(toggleMultipleRules).toHaveBeenCalledWith(body);
  });

  it('PUT /rules → 4xx if the service throws an error', async () => {
  const err = new Error('boom');
  const { toggleMultipleRules } = await import('../services/rule.service');
  (toggleMultipleRules as any).mockRejectedValueOnce(err);

  const body = { ips: { ids: [1], mode: 'whitelist' as const, active: true } };
  const res = await api().put(`${prefix}/rules`).send(body);
  expect(res.status).toBeGreaterThanOrEqual(400);
});


});
