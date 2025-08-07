"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.toggleRules = toggleRules;
const rule_service_1 = require("../services/rule.service");
async function getAll(req, res) {
    try {
        const result = await (0, rule_service_1.getAllRules)();
        res.status(200).json({
            status: 'success',
            rules: result,
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function toggleRules(req, res) {
    try {
        const { ips, urls, ports } = req.body;
        const updated = await (0, rule_service_1.toggleMultipleRules)({ ips, urls, ports });
        res.status(200).json({ updated });
    }
    catch (err) {
        console.error('Error toggling rules:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=rule.controller.js.map