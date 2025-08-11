import { RuleMode } from "../utils/constants";
import { addRulesToTable, deleteRulesFromTable } from './ruleOperations';
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
