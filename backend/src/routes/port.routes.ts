import { Router } from 'express';
import { handleAddPortRules, handleDeletePortRules } from '../controllers/port.controller';

const router = Router();

router.post('/port', handleAddPortRules);
router.delete('/port', handleDeletePortRules);

export default router;
