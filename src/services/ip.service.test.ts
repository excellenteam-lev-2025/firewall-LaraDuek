jest.mock('../validators/ip.validator', () => ({
  isValidIp: jest.fn()
}));
jest.mock('../services/ruleOperations', () => ({
  addRulesToTable: jest.fn(),
  deleteRulesFromTable: jest.fn()
}));

import { isValidIp } from '../validators/ip.validator';
import { addRulesToTable, deleteRulesFromTable } from '../services/ruleOperations';
import { addIpRules, deleteIpRules } from '../services/ip.service';

describe('ip.service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('addIpRules → delegates to addRulesToTable when all are valid', async () => {
    (isValidIp as jest.Mock).mockReturnValue(true);

    await addIpRules(['1.1.1.1', '8.8.8.8'], 'whitelist');

    expect(isValidIp).toHaveBeenCalledTimes(2);
    expect(addRulesToTable).toHaveBeenCalledWith('ip_rules', ['1.1.1.1', '8.8.8.8'], 'whitelist');
  });

  it('addIpRules → throws error if any IP is invalid', () => {
    (isValidIp as jest.Mock).mockReturnValue(false); 
    expect(() => addIpRules(['999.999.999.999'], 'blacklist'))
      .toThrow(/invalid/i);
    expect(addRulesToTable).not.toHaveBeenCalled();
  });


  it('deleteIpRules → delegates to deleteRulesFromTable', async () => {
    await deleteIpRules(['9.9.9.9'], 'whitelist');
    expect(deleteRulesFromTable).toHaveBeenCalledWith('ip_rules', ['9.9.9.9'], 'whitelist');
  });
});
