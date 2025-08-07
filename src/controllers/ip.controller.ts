import { createAddHandler, createDeleteHandler } from '../utils/ruleHandlers';
import { addIpRules, deleteIpRules } from '../services/ip.service';

export const handleAddIpRules = createAddHandler('ip', addIpRules);
export const handleDeleteIpRules = createDeleteHandler('ip', deleteIpRules);
