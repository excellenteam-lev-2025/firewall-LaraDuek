import { RuleMode } from "../utils/constants";
import { addRulesToTable, deleteRulesFromTable } from './ruleOperations';
import { isValidPort } from '../validators/port.validator';

export async function addPortRules(values: number[], mode: RuleMode) {
  if (!values.every(isValidPort)) {
    throw new Error('Invalid port number');
  }
  return addRulesToTable('port_rules', values, mode);
}

export function deletePortRules(values: number[], mode: RuleMode) {
  return deleteRulesFromTable('port_rules', values, mode);
}
