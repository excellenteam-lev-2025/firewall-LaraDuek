jest.mock('../db', () => ({
  pool: {
    connect: jest.fn()
  }
}));

import { pool } from '../db';
import { getAllRules, toggleMultipleRules } from '../services/rule.service';

describe('rules.service', () => {
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      query: jest.fn(),
      release: jest.fn()
    };
    (pool.connect as jest.Mock).mockResolvedValue(mockClient);
  });

  afterEach(() => jest.clearAllMocks());

  it('getAllRules → returns combined data from ip, url and port', async () => {
    mockClient.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // ip
      .mockResolvedValueOnce({ rows: [{ id: 2 }] }) // url
      .mockResolvedValueOnce({ rows: [{ id: 3 }] }); // port

    const result = await getAllRules();
    expect(result).toEqual({
      ip: [{ id: 1 }],
      url: [{ id: 2 }],
      port: [{ id: 3 }]
    });
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('getAllRules → propagates error if query fails', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('DB fail'));
    await expect(getAllRules()).rejects.toThrow('DB fail');
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('toggleMultipleRules → updates all three tables', async () => {
    mockClient.query.mockResolvedValue({ rows: [{ id: 10, value: 'x', active: true }] });

    const data = {
      ips: { ids: [1], mode: 'blacklist' as const , active: false },
      urls: { ids: [2], mode: 'whitelist' as const, active: true },
      ports: { ids: [3], mode: 'blacklist' as const, active: false }
    };

    const result = await toggleMultipleRules(data);
    expect(result.length).toBe(3);
    expect(mockClient.release).toHaveBeenCalledTimes(3); // one for each toggleActive
  });

  it('toggleMultipleRules → returns [] if no ids', async () => {
    const result = await toggleMultipleRules({});
    expect(result).toEqual([]);
  });

  it('toggleMultipleRules → throws if update fails', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('update fail'));

    await expect(
      toggleMultipleRules({
        ips: { ids: [1], mode: 'whitelist' as const, active: true }
      })
    ).rejects.toThrow(/update fail/i);

    expect(mockClient.release).toHaveBeenCalled();
  });
});
