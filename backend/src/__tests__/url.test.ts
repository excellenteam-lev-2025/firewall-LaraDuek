import { api, prefix } from './helpers/request';

jest.mock('../services/url.service', () => ({
  addUrlRules: jest.fn(),
  deleteUrlRules: jest.fn(),
}));

import { addUrlRules, deleteUrlRules } from '../services/url.service';

describe('URL endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('success', () => {
    it('POST /url blacklist (2 valid urls)', async () => {
      (addUrlRules as jest.Mock).mockResolvedValueOnce([
        { value: 'http://example.com', mode: 'blacklist' },
        { value: 'https://sub.site.org/path', mode: 'blacklist' },
      ]);

      const res = await api().post(`${prefix}/url`).send({
        values: ['http://example.com', 'https://sub.site.org/path'],
        mode: 'blacklist',
      });
      expect(res.status).toBeLessThan(400);
      expect(addUrlRules).toHaveBeenCalledWith(
        ['http://example.com', 'https://sub.site.org/path'],
        'blacklist'
      );
    });

    it('DELETE /url (delete existing)', async () => {
      (addUrlRules as jest.Mock).mockResolvedValueOnce([{ value: 'ok.test', mode: 'whitelist' }]);
      await api().post(`${prefix}/url`).send({ values: ['ok.test'], mode: 'whitelist' });

      (deleteUrlRules as jest.Mock).mockResolvedValueOnce([{ value: 'ok.test', mode: 'whitelist' }]);

      const del = await api().delete(`${prefix}/url`).send({ values: ['ok.test'], mode: 'whitelist' });
      expect(del.status).toBeLessThan(400);
      expect(deleteUrlRules).toHaveBeenCalledWith(['ok.test'], 'whitelist');
    });
  });

  describe('edge cases', () => {
    it('POST /url → 4xx if invalid URL', async () => {
      (addUrlRules as jest.Mock).mockRejectedValueOnce(new Error('Invalid URL'));

      const res = await api().post(`${prefix}/url`).send({
        values: ['ht!tp//bad'], 
        mode: 'whitelist',
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(String(res.body?.error ?? res.text)).toMatch(/invalid|url|error/i);
    });
  });

  describe('duplicates', () => {
    it('POST /url duplicated → 4xx', async () => {
      const body = { values: ['http://dup.test'], mode: 'whitelist' as const };

      (addUrlRules as jest.Mock).mockResolvedValueOnce([{ value: 'http://dup.test', mode: 'whitelist' }]);
      const a = await api().post(`${prefix}/url`).send(body);
      expect(a.status).toBeLessThan(400);

      const dupErr = Object.assign(new Error('duplicate'), { code: 'DUPLICATE' });
      (addUrlRules as jest.Mock).mockRejectedValueOnce(dupErr);

      const b = await api().post(`${prefix}/url`).send(body);
      expect(b.status).toBeGreaterThanOrEqual(400); 
    });
  });
});
