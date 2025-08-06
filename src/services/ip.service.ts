import { RuleMode } from '../models/IpRule';
import { addRulesToTable, deleteRulesFromTable } from '../utils/ruleOperations';
import { isValidIp } from '../validators/ip.validator';
import { BadRequestError } from '../utils/errors';


export function addIpRules(values: string[], mode: RuleMode) {
  if (!values.every(isValidIp)) {
    throw new BadRequestError('Invalid IP address format');
  }
  return addRulesToTable('ip_rules', values, mode);
}

export function deleteIpRules(values: string[], mode: RuleMode) {
  return deleteRulesFromTable('ip_rules', values, mode);
}

