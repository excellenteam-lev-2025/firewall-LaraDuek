import { api, prefix } from './helpers/request';

jest.mock('../services/ip.service', () => ({
  addIpRules: jest.fn(),
  deleteIpRules: jest.fn(),
}));

import { addIpRules, deleteIpRules } from '../services/ip.service';

describe('IP endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('success', () => {
    it('POST /ip whitelist (2 IPs)', async () => {
      (addIpRules as jest.Mock).mockResolvedValueOnce([
        { value: '192.168.1.10', mode: 'whitelist' },
        { value: '10.0.0.5', mode: 'whitelist' },
      ]);

      const res = await api().post(`${prefix}/ip`).send({
        values: ['192.168.1.10', '10.0.0.5'],
        mode: 'whitelist',
      });
      expect(res.status).toBeLessThan(400);
      expect(addIpRules).toHaveBeenCalledWith(['192.168.1.10', '10.0.0.5'], 'whitelist');
    });

    it('DELETE /ip (delete existing)', async () => {
      (addIpRules as jest.Mock).mockResolvedValueOnce([{ value: '9.9.9.9', mode: 'whitelist' }]);
      await api().post(`${prefix}/ip`).send({ values: ['9.9.9.9'], mode: 'whitelist' });

      (deleteIpRules as jest.Mock).mockResolvedValueOnce([{ value: '9.9.9.9', mode: 'whitelist' }]);

      const del = await api().delete(`${prefix}/ip`).send({ values: ['9.9.9.9'], mode: 'whitelist' });
      expect(del.status).toBeLessThan(400);
      expect(deleteIpRules).toHaveBeenCalledWith(['9.9.9.9'], 'whitelist');
    });
  });

  describe('edge cases', () => {
    it('POST /ip → 400 if invalid IP', async () => {
      (addIpRules as jest.Mock).mockRejectedValueOnce(new Error('Invalid IP address format'));
      const res = await api().post(`${prefix}/ip`).send({
        values: ['999.999.999.999'],
        mode: 'whitelist',
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(String(res.body?.error ?? res.text)).toMatch(/invalid|internal|error/i);
    });

    it('POST /ip → 400 if missing mode', async () => {
      const res = await api().post(`${prefix}/ip`).send({ values: ['1.1.1.1'] });
    expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('DELETE /ip → 400 if values is not an array', async () => {
      const res = await api().delete(`${prefix}/ip`).send({ values: null, mode: 'whitelist' });
      expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('DELETE /ip → 500 if service throws error', async () => {
      (deleteIpRules as jest.Mock).mockRejectedValueOnce(new Error('db down'));
      const res = await api()
      .delete(`${prefix}/ip`)
      .send({ values: ['1.1.1.1'], mode: 'whitelist' });
      expect(res.status).toBe(500);
      expect(String(res.body?.error ?? res.text)).toMatch(/internal/i);
    });

  });

  describe('duplicates', () => {
    it('POST /ip duplicated → 4xx', async () => {
      const body = { values: ['1.2.3.4'], mode: 'whitelist' as const };

      (addIpRules as jest.Mock).mockResolvedValueOnce([{ value: '1.2.3.4', mode: 'whitelist' }]);
      const a = await api().post(`${prefix}/ip`).send(body);
      expect(a.status).toBeLessThan(400);

      const dupErr = Object.assign(new Error('duplicate'), { code: 'DUPLICATE' });
      (addIpRules as jest.Mock).mockRejectedValueOnce(dupErr);

      const b = await api().post(`${prefix}/ip`).send(body);
      expect(b.status).toBeGreaterThanOrEqual(400);
    });
  });
});
