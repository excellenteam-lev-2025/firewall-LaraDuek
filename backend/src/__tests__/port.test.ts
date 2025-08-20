import { api, prefix } from './helpers/request';

jest.mock('../services/port.service', () => ({
  addPortRules: jest.fn(),
  deletePortRules: jest.fn(),
}));

import { addPortRules, deletePortRules } from '../services/port.service';

describe('Port endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('success', () => {
    it('POST /port whitelist (22, 80, 443, 65535)', async () => {
      (addPortRules as jest.Mock).mockResolvedValueOnce([
        { value: 22, mode: 'whitelist' },
        { value: 80, mode: 'whitelist' },
        { value: 443, mode: 'whitelist' },
        { value: 65535, mode: 'whitelist' },
      ]);

      const res = await api().post(`${prefix}/port`).send({
        values: [22, 80, 443, 65535],
        mode: 'whitelist',
      });
      expect(res.status).toBeLessThan(400);
      expect(addPortRules).toHaveBeenCalledWith([22, 80, 443, 65535], 'whitelist');
    });

    it('DELETE /port (delete existing)', async () => {
      (addPortRules as jest.Mock).mockResolvedValueOnce([{ value: 8080, mode: 'blacklist' }]);
      await api().post(`${prefix}/port`).send({ values: [8080], mode: 'blacklist' });

      (deletePortRules as jest.Mock).mockResolvedValueOnce([{ value: 8080, mode: 'blacklist' }]);

      const del = await api().delete(`${prefix}/port`).send({ values: [8080], mode: 'blacklist' });
      expect(del.status).toBeLessThan(400);
      expect(deletePortRules).toHaveBeenCalledWith([8080], 'blacklist');
    });
  });

  describe('edge cases', () => {
    it('POST /port → 4xx if out of range (0, 70000)', async () => {
      (addPortRules as jest.Mock).mockRejectedValueOnce(new Error('Port out of range'));

      const res = await api().post(`${prefix}/port`).send({
        values: [0, 70000],
        mode: 'whitelist',
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(String(res.body?.error ?? res.text)).toMatch(/port|range|error/i);
    });

    it('DELETE /port → 4xx (delete non-existing port)', async () => {
      const notFoundErr = Object.assign(new Error('Port not found'), { code: 'NOT_FOUND' });
      (deletePortRules as jest.Mock).mockRejectedValueOnce(notFoundErr);
      const res = await api().delete(`${prefix}/port`).send({
        values: [99999], //not existing port
        mode: 'whitelist',
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(deletePortRules).toHaveBeenCalledWith([99999], 'whitelist');
    });
  });

  describe('duplicates', () => {
    it('POST /port duplicated → 4xx', async () => {
      const body = { values: [12345], mode: 'whitelist' as const };

      (addPortRules as jest.Mock).mockResolvedValueOnce([{ value: 12345, mode: 'whitelist' }]);
      const a = await api().post(`${prefix}/port`).send(body);
      expect(a.status).toBeLessThan(400);

      const dupErr = Object.assign(new Error('duplicate'), { code: 'DUPLICATE' });
      (addPortRules as jest.Mock).mockRejectedValueOnce(dupErr);

      const b = await api().post(`${prefix}/port`).send(body);
      expect(b.status).toBeGreaterThanOrEqual(400); 
    });
  });
});
