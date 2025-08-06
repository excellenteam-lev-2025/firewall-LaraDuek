import { Router } from 'express';
import { handleAddIpRules, handleDeleteIpRules } from '../controllers/ip.controller';

const router = Router();

router.post('/ip', handleAddIpRules);
router.delete('/ip', handleDeleteIpRules);


export default router;
