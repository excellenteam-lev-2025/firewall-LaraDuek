import express from 'express';
import * as ruleController from '../controllers/rule.controller';

const router = express.Router();

router.get('/rules', ruleController.getAll);
router.put('/rules', ruleController.toggleRules);

export default router;
