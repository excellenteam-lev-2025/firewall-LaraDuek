import { RuleMode } from "../utils/constants";
import { addRulesToTable, deleteRulesFromTable } from './ruleOperations';
import { isValidIp } from '../validators/ip.validator';


export function addIpRules(values: string[], mode: RuleMode) {
  if (!values.every(isValidIp)) {
    throw new Error('Invalid IP address format');
  }
  return addRulesToTable('ip_rules', values, mode);
}

export function deleteIpRules(values: string[], mode: RuleMode) {
  return deleteRulesFromTable('ip_rules', values, mode);
}

