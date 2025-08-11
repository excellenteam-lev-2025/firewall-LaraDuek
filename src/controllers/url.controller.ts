import { createAddHandler, createDeleteHandler } from './ruleHandlers';
import { addUrlRules, deleteUrlRules } from '../services/url.service';

export const handleAddUrlRules = createAddHandler('url', addUrlRules);
export const handleDeleteUrlRules = createDeleteHandler('url', deleteUrlRules);
