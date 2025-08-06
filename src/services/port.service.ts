import { RuleMode } from '../models/PortRule';
import { addRulesToTable, deleteRulesFromTable } from '../utils/ruleOperations';
import { isValidPort } from '../validators/port.validator';
import { BadRequestError } from '../utils/errors';

export async function addPortRules(values: number[], mode: RuleMode) {
  if (!values.every(isValidPort)) {
    throw new BadRequestError('Invalid port number');
  }
  return addRulesToTable('port_rules', values, mode);
}

export function deletePortRules(values: number[], mode: RuleMode) {
  return deleteRulesFromTable('port_rules', values, mode);
}
