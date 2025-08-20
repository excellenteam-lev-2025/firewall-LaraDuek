// src/__tests__/ruleOperations.catch.test.ts
jest.mock('../db', () => ({
  pool: { connect: jest.fn() }
}));

import { pool } from '../db';
import { addRulesToTable, deleteRulesFromTable } from './ruleOperations';

describe('ruleOperations catch blocks', () => {
  let mockClient: { query: jest.Mock; release: jest.Mock };

  beforeEach(() => {
    mockClient = { query: jest.fn(), release: jest.fn() };
    (pool.connect as jest.Mock).mockResolvedValue(mockClient);
    jest.clearAllMocks();
  });

  it('addRulesToTable → propagates error and releases client (catch)', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('insert fail'));

    await expect(
      addRulesToTable('ip_rules', ['1.1.1.1'], 'whitelist' as const)
    ).rejects.toThrow(/insert fail/i);

    expect(mockClient.query).toHaveBeenCalled();
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('deleteRulesFromTable → propagates error and releases client (catch)', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('delete fail'));

    await expect(
      deleteRulesFromTable('port_rules', [22], 'blacklist' as const)
    ).rejects.toThrow(/delete fail/i);

    expect(mockClient.query).toHaveBeenCalled();
    expect(mockClient.release).toHaveBeenCalled();
  });
});
