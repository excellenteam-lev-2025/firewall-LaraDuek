import { Router } from 'express';
import { handleAddUrlRules, handleDeleteUrlRules } from '../controllers/url.controller';

const router = Router();

router.post('/url', handleAddUrlRules);
router.delete('/url', handleDeleteUrlRules);

export default router;
