jest.mock('../validators/port.validator', () => ({
  isValidPort: jest.fn()
}));
jest.mock('../services/ruleOperations', () => ({
  addRulesToTable: jest.fn(),
  deleteRulesFromTable: jest.fn()
}));

import { isValidPort } from '../validators/port.validator';
import { addRulesToTable, deleteRulesFromTable } from './ruleOperations';
import { addPortRules, deletePortRules } from './port.service';

describe('port.service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('addPortRules → delegates when all ports are valid', async () => {
    (isValidPort as jest.Mock).mockReturnValue(true);

    await addPortRules([22, 80, 443], 'whitelist');

    expect(isValidPort).toHaveBeenCalledTimes(3);
    expect(addRulesToTable).toHaveBeenCalledWith('port_rules', [22, 80, 443], 'whitelist');
  });

  it('addPortRules → throws error if any port is invalid', async () => {
    (isValidPort as jest.Mock).mockImplementation((n: number) => n > 0 && n <= 65535);

    await expect(addPortRules([0], 'blacklist')).rejects.toThrow(/invalid port/i);
    expect(addRulesToTable).not.toHaveBeenCalled();
  });

  it('deletePortRules → delegates to deleteRulesFromTable', async () => {
    await deletePortRules([8080], 'blacklist');
    expect(deleteRulesFromTable).toHaveBeenCalledWith('port_rules', [8080], 'blacklist');
  });
});
