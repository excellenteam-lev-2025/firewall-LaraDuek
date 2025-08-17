jest.mock('../validators/url.validator', () => ({
  isValidUrl: jest.fn()
}));
jest.mock('../services/ruleOperations', () => ({
  addRulesToTable: jest.fn(),
  deleteRulesFromTable: jest.fn()
}));

import { isValidUrl } from '../validators/url.validator';
import { addRulesToTable, deleteRulesFromTable } from '../services/ruleOperations';
import { addUrlRules, deleteUrlRules } from '../services/url.service';

describe('url.service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('addUrlRules → delegates when all URLs are valid', () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);

    addUrlRules(['https://test.com', 'http://abc.com'], 'whitelist');

    expect(isValidUrl).toHaveBeenCalledTimes(2);
    expect(addRulesToTable).toHaveBeenCalledWith('url_rules', ['https://test.com', 'http://abc.com'], 'whitelist');
  });

  it('addUrlRules → throws error if any URL is invalid', () => {
    (isValidUrl as jest.Mock).mockImplementation((u: string) => u.startsWith('http'));

    expect(() => addUrlRules(['ftp://bad.com'], 'blacklist')).toThrow(/invalid url/i);
    expect(addRulesToTable).not.toHaveBeenCalled();
  });

  it('deleteUrlRules → delegates to deleteRulesFromTable', () => {
    deleteUrlRules(['https://site.com'], 'whitelist');
    expect(deleteRulesFromTable).toHaveBeenCalledWith('url_rules', ['https://site.com'], 'whitelist');
  });
});
