import { RuleMode } from '../models/UrlRule';
import { addRulesToTable, deleteRulesFromTable } from '../utils/ruleOperations';
import { isValidUrl } from '../validators/url.validator';
import { BadRequestError } from '../utils/errors';

export function addUrlRules(values: string[], mode: RuleMode) {
  if (!values.every(isValidUrl)) {
    throw new BadRequestError('Invalid URL format');
  }
  return addRulesToTable('url_rules', values, mode);
}

export function deleteUrlRules(values: string[], mode: RuleMode) {
  return deleteRulesFromTable('url_rules', values, mode);
}
