"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ip_controller_1 = require("../controllers/ip.controller");
const router = (0, express_1.Router)();
router.post('/ip', ip_controller_1.handleAddIpRules);
router.delete('/ip', ip_controller_1.handleDeleteIpRules);
exports.default = router;
//# sourceMappingURL=ip.routes.js.map