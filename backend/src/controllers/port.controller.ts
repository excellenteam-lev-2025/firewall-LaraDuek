import { createAddHandler, createDeleteHandler } from './ruleHandlers';
import { addPortRules, deletePortRules } from '../services/port.service';

export const handleAddPortRules = createAddHandler('port', addPortRules);
export const handleDeletePortRules = createDeleteHandler('port', deletePortRules);
